# GA4 を Claude から直接見られるようにする

Google 公式の MCP サーバー（[googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp)）を
つなぐと、CSVを書き出して貼らなくても、チャットから直接 GA4 に問い合わせられます。

```
「先月いちばん印刷された型紙は？」
「表示回数が3未満のガイドを英語・日本語それぞれ数えて」
「results が 0 の検索語を多い順に」
```

サーバー本体は Apache-2.0 の無料ソフトです。費用はかかりません。

---

## 鍵をどこに置くか（結論）

**リポジトリには置きません。置き場所は使う場所によって2つです。**

| 使う場所 | 鍵の置き場所 |
|---|---|
| 手元のパソコン | パソコン内の好きな場所（リポジトリの外）。そのパスを `GOOGLE_APPLICATION_CREDENTIALS` に入れる |
| クラウドのセッション | **ファイルとしては置けません。** 環境変数に中身を入れ、セッション開始時にフックがファイル化します |

クラウドのコンテナは毎回まっさらで、手元のファイルは入っていません。
だから「鍵を置く」のではなく「鍵の中身を環境変数で渡す」形になります。

---

## 先に知っておくこと

- **鍵（JSONキー）は絶対にこのリポジトリに入れないでください。** 公開リポジトリです。
  `.gitignore` に代表的なファイル名を入れてありますが、名前を変えれば通ってしまいます。
- 設定を足しても、**すでに動いているセッションには反映されません。** 次に開いたセッションから有効になります。
- サービスアカウントには **閲覧者（読み取り専用）** だけを与えます。書き込み権限は要りません。

---

## 1. Google Cloud 側（初回だけ）

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作る（既存のものでも可）
2. 「APIとサービス」→「ライブラリ」で次の**2つ**を有効化する
   - **Google Analytics Data API**
   - **Google Analytics Admin API**（プロパティ一覧の取得に使います）
3. 「IAMと管理」→「サービスアカウント」で新規作成する
   - ロールは**付けなくて構いません**（GA4側で権限を与えるため）
4. 作ったサービスアカウントの「キー」タブ →「鍵を追加」→「JSON」でダウンロードする

## 2. GA4 側（初回だけ）

1. GA4 の「管理」→「プロパティのアクセス管理」
2. サービスアカウントのメールアドレス（`....iam.gserviceaccount.com`）を追加
3. 役割は **閲覧者**

プロパティIDは覚えなくて大丈夫です。`get_account_summaries` が一覧を返してくれます。

---

## 3-A. 手元のパソコンでつなぐ（Claude Desktop / ローカルの Claude Code）

ダウンロードした鍵を、**リポジトリの外**の安全な場所に置きます。

Claude Desktop なら `claude_desktop_config.json` に書きます。

```json
{
  "mcpServers": {
    "google-analytics": {
      "command": "uvx",
      "args": ["analytics-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/あなた/.config/katagami/ga-service-account.json",
        "GOOGLE_PROJECT_ID": "あなたのプロジェクトID"
      }
    }
  }
}
```

`uvx` は [uv](https://docs.astral.sh/uv/) に付属します。`pipx` を使っているなら
`"command": "pipx", "args": ["run", "analytics-mcp"]` でも同じです。

ローカルの Claude Code で使う場合は、このリポジトリの `.mcp.json` がそのまま効きます。
鍵の置き場所だけ環境変数で教えてください。

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/katagami/ga-service-account.json"
export GOOGLE_PROJECT_ID="あなたのプロジェクトID"
```

## 3-B. クラウドのセッションでつなぐ

### 手順1. 鍵を1行の base64 にする

環境変数は `.env` 形式（1行1つの `KEY=value`）で、**複数行の値は引用符で囲む必要があります**。
鍵JSONは改行を含むうえ `private_key` の中に `\n` が入っているので、そのまま貼ると壊れがちです。
base64 にして1行にすれば、引用符も改行も考えずに済みます。

```bash
# macOS（クリップボードに入ります）
base64 -i ga-service-account.json | tr -d '\n' | pbcopy

# Linux
base64 -w0 ga-service-account.json
```

### 手順2. 環境変数に入れる

[claude.ai/code](https://claude.ai/code) の**環境設定ダイアログ**を開き、**環境変数**の欄に貼ります。

```
GA_SERVICE_ACCOUNT_B64=（手順1で作った1行）
GOOGLE_PROJECT_ID=あなたのGoogle CloudプロジェクトID
```

環境変数は**セッション開始時に一度だけ読み込まれます**。いま開いているセッションには反映されません。

### 手順3. （設定済み）セッション開始フック

`.claude/hooks/session-start.sh` が、セッションのたびに環境変数を復号して
`/home/user/.config/katagami/ga-service-account.json` に書き出します。
`.mcp.json` の既定値がこのパスなので、これだけでつながります。

**書き出し先はリポジトリの外**です。`git status` には出てきません。

鍵の中身をログに出さず、JSONとして読めなければ書きかけのファイルを消します。
環境変数が未設定なら何もせず終了するので、設定前でもセッションは普通に起動します。

> **セットアップスクリプトではなくフックにしている理由**
> セットアップスクリプトの結果は約7日間ファイルスナップショットとしてキャッシュされ、
> 2回目以降のセッションでは実行されません。鍵を入れ替えても古いファイルが残り続けます。
> フックは毎セッション走るので、入れ替えが次のセッションから効きます。

---

## 4. つながったか確かめる

新しいセッションを開いて、こう聞いてください。

```
GA4 のアカウントとプロパティの一覧を見せて
```

`get_account_summaries` が katagami.org のプロパティを返せば成功です。
返ってこない場合、原因はたいてい次のどれかです。

| 症状 | 原因 |
|---|---|
| プロパティが空で返る | GA4 側でサービスアカウントに閲覧者を与えていない |
| `PERMISSION_DENIED` | Data API または Admin API が有効化されていない |
| `DefaultCredentialsError` | 鍵ファイルのパスが違う。`GOOGLE_APPLICATION_CREDENTIALS` を確認 |
| サーバーが出てこない | 設定前から開いていたセッション。開き直す |
| `File ... was not found` | 環境変数が未設定のまま。手順2を確認し、**セッションを開き直す** |
| `base64を復号できませんでした` | 貼り付けた base64 に改行が混ざっている。`tr -d '\n'` / `-w0` を使う |

---

## 5. つないだあとに効いてくること

カスタム定義に登録したパラメータは、`get_custom_dimensions_and_metrics` から見えるようになります。
**登録していないパラメータは MCP 経由でも取れません。**
レビューチェックリストの「9. アクセス解析」に、登録すべきものを挙げてあります。

とくに `results`（検索の結果件数）を**指標**で登録しておくと、
「`results` が 0 の検索語を多い順に」がそのまま聞けるようになります。
これは次にどの型紙を作るべきかの、いちばん直接的な手がかりです。
