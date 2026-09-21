#!/bin/bash
# GA4 の MCP サーバー（.mcp.json の google-analytics）の状態をセッション開始時に知らせる。
#
# 方針: GA4 の鍵は「手元のパソコンだけ」で使います。クラウドのセッションでは使いません。
#
# なぜクラウドで使わないのか:
#   クラウドの環境変数は、公式ドキュメントにこうあります。
#     - "any command Claude runs can read"（セッション内のどのコマンドからも読める）
#     - "Anyone who uses the environment can read the values"（その環境を使う人は誰でも読める）
#   つまりリポジトリには出ませんが、秘密としては守られません。
#   このリポジトリは公開なので、鍵はクラウドに置かない方針にしました。
#   経緯と代替案は docs/ga-mcp-setup.md に書いてあります。
#
# このフックは鍵を書き出しません。状況を一行知らせるだけです。
# 環境変数の設定もしません。GOOGLE_APPLICATION_CREDENTIALS を「読む」だけです。
# 設定する場所は .claude/settings.local.json の env（git管理外）。docs/ga-mcp-setup.md の 3-2 を参照。
#
# Windows では Git Bash 経由で動きます（.claude/settings.json で "shell": "bash" を明示）。
# Git Bash が無ければ起動に失敗しますが、非ブロッキングなのでセッションは普通に続きます。

set -uo pipefail

CRED="${GOOGLE_APPLICATION_CREDENTIALS:-}"

# 手元のパソコンで、鍵の置き場所が正しく設定されている場合。黙って終わる。
if [ -n "$CRED" ] && [ -f "$CRED" ]; then
  exit 0
fi

if [ -n "${CLAUDE_CODE_REMOTE:-}" ]; then
  # クラウドのセッション。google-analytics のツールは一覧に出ますが、
  # 呼ぶと「File ... was not found」で失敗します。方針どおりなので、そう伝える。
  echo "GA4のMCPは手元のパソコン専用です（方針）。このクラウドセッションでは google-analytics のツールは使えません。GA4の数字が要るときは、手元のパソコンのClaude Codeで聞いてください。詳しくは docs/ga-mcp-setup.md。"

  # 方針に反して鍵がクラウドに置かれていないか見張る（値は絶対に出力しない）。
  for v in GA_SERVICE_ACCOUNT_B64 GA_SERVICE_ACCOUNT_JSON; do
    if [ -n "${!v:-}" ]; then
      echo "【注意】環境変数 $v に値が入っています。この方針では不要です。クラウド環境の設定から削除し、Google Cloud でその鍵を無効化してください。"
    fi
  done
  exit 0
fi

# 手元のパソコンだが、まだ設定されていない場合。
if [ -n "$CRED" ]; then
  echo "GOOGLE_APPLICATION_CREDENTIALS が指すファイルが見つかりません（$CRED）。パスを確認してください。docs/ga-mcp-setup.md の「3-2. 鍵の場所を Claude Code に教える」を参照。"
else
  echo "GA4のMCPは未設定です。使うなら .claude/settings.local.json の env に GOOGLE_APPLICATION_CREDENTIALS（鍵ファイルのパス）を入れてください。docs/ga-mcp-setup.md の「3-2. 鍵の場所を Claude Code に教える」を参照。"
fi

exit 0
