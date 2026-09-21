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

**GA4 は手元のパソコンだけで使います。クラウドのセッションでは使いません。**

| 使う場所 | 鍵の置き場所 |
|---|---|
| 手元のパソコン | パソコン内の好きな場所（リポジトリの外）。そのパスを `GOOGLE_APPLICATION_CREDENTIALS` に入れる |
| クラウドのセッション | **置きません。**（理由は「4. クラウドでは使わない理由」） |

リポジトリにも置きません。公開リポジトリだからです。

---

## 先に知っておくこと

- **鍵（JSONキー）は絶対にこのリポジトリに入れないでください。** 公開リポジトリです。
  `.gitignore` に代表的なファイル名を入れてありますが、名前を変えれば通ってしまいます。
- **鍵をクラウドの環境変数にも入れません。** 理由は「4. クラウドでは使わない理由」。
- 設定を足しても、**すでに動いているセッションには反映されません。** 次に開いたセッションから有効になります。
- サービスアカウントには **閲覧者（読み取り専用）** だけを与えます。書き込み権限は要りません。
- Google Cloud 側のプロジェクトロールも**付けません**。GA4 の読み取りに IAM ロールは不要です。

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

## 3. 手元のパソコンでつなぐ（Windows / ローカルの Claude Code）

### 3-1. 鍵を置く

ダウンロードした鍵を、**リポジトリの外**に置きます。Windows ならたとえばここです。

```
C:\Users\あなた\.config\katagami\ga-service-account.json
```

`.config` フォルダはエクスプローラーの「新しいフォルダー」では作りにくいので、
PowerShell で作るのが早いです。

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.config\katagami"
```

### 3-2. 鍵の場所を Claude Code に教える（推奨）

`.claude/settings.local.json` に書きます。**この方法を勧めます。**

- OS やシェルに依存しません（PowerShell でも Git Bash でも同じ）
- `claude` をどう起動しても効きます（ショートカット起動でも効く）
- `.gitignore` の `.claude/*` で除外されるので、**git には入りません**

リポジトリの `.claude/settings.local.json` を新規作成し、こう書きます。

```json
{
  "env": {
    "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\あなた\\.config\\katagami\\ga-service-account.json",
    "GOOGLE_PROJECT_ID": "katagami-509005"
  }
}
```

> **JSON ではバックスラッシュを2つ重ねます。** `C:\Users` は `C:\\Users` と書きます。
> `C:/Users/あなた/...` のようにスラッシュで書いても動きます。

公式ドキュメントにこうあります。

> Add variables under the `env` key in a `settings.json` file (...)
> Claude Code reads them directly from the file, so they **take effect no matter how `claude` was launched**.
>
> Claude Code writes each `env` entry into the process environment.

`.mcp.json` の `google-analytics` は Claude Code の子プロセスとして起動するので、
ここで書いた値をそのまま受け取ります。

<details>
<summary>PowerShell の環境変数で設定する場合（代替）</summary>

`settings.local.json` を使わないなら、PowerShell で設定します。
**Windows に `export` はありません。**

```powershell
# このウィンドウだけ有効（試すとき用）
$env:GOOGLE_APPLICATION_CREDENTIALS = "$env:USERPROFILE\.config\katagami\ga-service-account.json"
$env:GOOGLE_PROJECT_ID = "katagami-509005"

# ずっと有効（次に開くウィンドウから効きます）
[Environment]::SetEnvironmentVariable(
  "GOOGLE_APPLICATION_CREDENTIALS",
  "$env:USERPROFILE\.config\katagami\ga-service-account.json", "User")
[Environment]::SetEnvironmentVariable("GOOGLE_PROJECT_ID", "katagami-509005", "User")
```

`SetEnvironmentVariable` で設定した場合、**すでに開いている端末や Claude Code には反映されません。**
開き直してください。

macOS / Linux なら次のとおりです。

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/katagami/ga-service-account.json"
export GOOGLE_PROJECT_ID="katagami-509005"
```

</details>

### 3-3. `uvx` を入れる

`.mcp.json` は `uvx analytics-mcp` でサーバーを起動します。
`uvx` は [uv](https://docs.astral.sh/uv/) に付属します。

```powershell
winget install --id=astral-sh.uv -e
```

入ったか確認します。

```powershell
uvx --version
```

<details>
<summary>Claude Desktop で使う場合</summary>

Claude Desktop はこのリポジトリの `.mcp.json` を読みません。
`claude_desktop_config.json` に直接書きます。

```json
{
  "mcpServers": {
    "google-analytics": {
      "command": "uvx",
      "args": ["analytics-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\あなた\\.config\\katagami\\ga-service-account.json",
        "GOOGLE_PROJECT_ID": "katagami-509005"
      }
    }
  }
}
```

</details>

### 3-4. セッション開始フックについて

`.claude/hooks/session-start.sh` は **`GOOGLE_APPLICATION_CREDENTIALS` を読むだけ**で、
環境変数を設定することはありません。設定するのは 3-2 のあなたの作業です。
フックは状況を一行知らせるだけです（設定済みなら何も言いません）。

フックは bash スクリプトなので、Windows では **Git Bash** 経由で動きます。
Git for Windows を入れていれば入っています。`.claude/settings.json` で `"shell": "bash"` を
明示してあるので、PowerShell に落ちて失敗することはありません。

Git Bash が無い環境では、フックが起動できず次のような注意が出ることがあります。

```
Failed with non-blocking status code ...
```

**これはセッションを止めません。** GA4 の接続にも影響しません（フックは鍵を扱わないため）。
気になる場合は Git for Windows を入れてください。

## 4. クラウドでは使わない理由

クラウドのセッションで GA4 を使うには、鍵の中身を**環境変数**に入れるしかありません。
一度その方式を組みましたが、調べたうえで**やめました**。記録として理由を残します。

### 環境変数は「秘密」ではない

リポジトリには出ません。コミットにも PR にも現れません。そこは問題ありません。
ただし[公式ドキュメント](https://code.claude.com/docs/en/cloud-environments#set-environment-variables)に、こうあります。

> Each session copies the environment's values once, at startup, into ordinary environment variables that **any command Claude runs can read.**
>
> **Anyone who uses the environment can read the values.**

つまり、

- セッション内で動くどのコマンドからも読めます（エージェント自身も `env` で読めます）
- その環境を使う人は誰でも読めます

「リポジトリに出ない」ことと「秘密として守られる」ことは別です。
このリポジトリは公開なので、後者が必要でした。

### 「見せずに渡す」機能は GA4 には使えない

Pro / Max プランには **API credentials** という機能があり、
鍵をエージェントに見せずにプロキシがリクエストへ付けてくれます（`The key never reaches Claude`）。

ただし GA4 では使えません。GA4 のサービスアカウント認証は、
鍵で JWT に署名して OAuth トークンと交換する方式です。
決まったヘッダーを足すだけでは成立しません。
`analytics-mcp` はローカルの鍵ファイルを読んで自分で署名します。

### セッションの公開設定にも注意

Pro / Max では、セッションの公開範囲が **Private / Public** です。
Public にすると claude.ai にログインしている人なら誰でも閲覧できます。
公式ドキュメントも、セッションにはコードや認証情報が含まれうるので共有前に確認するよう警告しています。
既定は Private です。**このリポジトリのセッションを Public にしないでください。**

### 結論

GA4 の数字が要るときは、**手元のパソコンの Claude Code** で聞きます。
クラウドのセッションでは聞きません。

なお、クラウドでも `.mcp.json` の `google-analytics` は起動し、ツールの一覧には出てきます。
呼ぶと `File ... was not found` で失敗します。これは**想定どおり**です。
紛らわしいので、セッション開始フック（`.claude/hooks/session-start.sh`）が
「手元のパソコン専用です」と一行知らせます。
このフックは鍵を書き出しません。方針に反して鍵が環境変数に入っていたら警告します。

---

## 5. つながったか確かめる

**手元のパソコンで**新しいセッションを開いて、こう聞いてください。

```
GA4 のアカウントとプロパティの一覧を見せて
```

`get_account_summaries` が katagami.org のプロパティを返せば成功です。
返ってこない場合、原因はたいてい次のどれかです。

| 症状 | 原因 |
|---|---|
| プロパティが空で返る | GA4 側でサービスアカウントに閲覧者を与えていない（いちばん多い） |
| `PERMISSION_DENIED` | Data API または Admin API が有効化されていない |
| `DefaultCredentialsError` | 鍵ファイルのパスが違う。`GOOGLE_APPLICATION_CREDENTIALS` を確認 |
| サーバーが出てこない | 設定前から開いていたセッション。開き直す |
| `File ... was not found`（クラウド） | クラウドで聞いている。方針どおり。手元のパソコンで聞く |
| `File ... was not found`（手元のPC） | パスが違う。JSON でバックスラッシュが `\\` になっているか確認 |
| `uvx` が見つからない | uv が未インストール。`winget install --id=astral-sh.uv -e` |
| `Failed with non-blocking status code` | Git Bash が無くフックが起動できない。**害はありません**（フックは鍵を扱わない） |

---

## 6. つないだあとに効いてくること

カスタム定義に登録したパラメータは、`get_custom_dimensions_and_metrics` から見えるようになります。
**登録していないパラメータは MCP 経由でも取れません。**
レビューチェックリストの「9. アクセス解析」に、登録すべきものを挙げてあります。

とくに `results`（検索の結果件数）を**指標**で登録しておくと、
「`results` が 0 の検索語を多い順に」がそのまま聞けるようになります。
これは次にどの型紙を作るべきかの、いちばん直接的な手がかりです。
