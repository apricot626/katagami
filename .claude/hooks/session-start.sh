#!/bin/bash
# GA4 の MCP サーバー（.mcp.json の google-analytics）が使うサービスアカウント鍵を、
# 環境変数からファイルに書き出す。
#
# クラウドのコンテナは毎回まっさらなので、鍵をファイルとして置き直す必要があります。
# 鍵そのものはリポジトリに入れません。環境設定の「環境変数」に入れた値だけを読みます。
#
# なぜ SessionStart フックで、セットアップスクリプトではないのか:
#   セットアップスクリプトの結果はファイルスナップショットとして約7日キャッシュされ、
#   2回目以降のセッションでは実行されません。鍵を入れ替えても古いファイルが残ります。
#   このフックは毎セッション走るので、入れ替えが次のセッションから効きます。
#
# 環境変数（どちらか一方でよい）:
#   GA_SERVICE_ACCOUNT_B64   … 鍵JSONを base64 にした1行の文字列（推奨）
#   GA_SERVICE_ACCOUNT_JSON  … 鍵JSONそのもの
# 手元のパソコンでは GOOGLE_APPLICATION_CREDENTIALS に実ファイルを指すので、何もしません。

set -uo pipefail

DEST="/home/user/.config/katagami/ga-service-account.json"

# すでに実ファイルを指しているなら触らない（手元のパソコン向け）
if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ] && [ -f "${GOOGLE_APPLICATION_CREDENTIALS}" ]; then
  exit 0
fi

write_key() {
  mkdir -p "$(dirname "$DEST")" || return 1
  umask 077
  cat > "$DEST" || return 1
  chmod 600 "$DEST" 2>/dev/null
  # 中身がJSONとして読めるかだけ見る（鍵の中身は絶対に出力しない）
  if python3 -c "import json,sys; d=json.load(open('$DEST')); sys.exit(0 if d.get('client_email') else 1)" 2>/dev/null; then
    return 0
  fi
  rm -f "$DEST"
  return 1
}

if [ -n "${GA_SERVICE_ACCOUNT_B64:-}" ]; then
  if printf '%s' "$GA_SERVICE_ACCOUNT_B64" | base64 -d 2>/dev/null | write_key; then
    echo "GA4の鍵を用意しました（$DEST）。google-analytics の MCP ツールが使えます。"
  else
    echo "GA_SERVICE_ACCOUNT_B64 を復号できませんでした。base64が途中で切れていないか確認してください（改行が混ざっていると失敗します）。"
  fi
elif [ -n "${GA_SERVICE_ACCOUNT_JSON:-}" ]; then
  if printf '%s' "$GA_SERVICE_ACCOUNT_JSON" | write_key; then
    echo "GA4の鍵を用意しました（$DEST）。google-analytics の MCP ツールが使えます。"
  else
    echo "GA_SERVICE_ACCOUNT_JSON が正しいJSONとして読めませんでした。改行やクォートで壊れている可能性があります。GA_SERVICE_ACCOUNT_B64（base64）のほうが確実です。"
  fi
fi

exit 0
