# GitHub（非公開）でのドキュメント・進行管理 — 手順

このプロジェクトを **非公開（private）リポジトリ** で版管理し、ドキュメントと進行を管理するための手順です。
**サイトの公開（ホスティング）はここでは行いません**（別フェーズ・別手段で実施）。
**🔐 認証が必要** な操作は、あなた自身のアカウントで実施してください。

> 注意：下のコマンドはコメント（説明文）を含めず、コマンド行だけを貼ってください。zsh では `#` で始まる行を貼ると `command not found: #` になります。

---

## 事前準備
- Git のインストール（`git --version` で確認）
- GitHub アカウント（無料）。**🔐 未登録なら https://github.com で作成**
- GUIが安心なら GitHub Desktop でも可。CLIで学ぶなら以下を実施。

---

## 1. ローカルをGit管理にする

プロジェクトフォルダ `~/Desktop/dev/katagami` の中で実行します（置き場所が違う場合はパスを読み替え）。

まずフォルダへ移動し、中身を確認します（`index.html` と `docs` が見えればOK）。

```bash
cd ~/Desktop/dev/katagami
ls
```

コミットの署名（名前・メール）を設定します。**下の値は必ず自分のものに置き換えてください。**（設定済みなら飛ばして可）

```bash
git config --global user.name "自分の名前"
git config --global user.email "自分のメール"
```

Git管理を開始し、最初のコミットを作ります。

```bash
git init
git add .
git commit -m "初回コミット: 型紙生成ツールと要件定義一式"
```

成功すると警告は出ず、`git commit` のあとに変更ファイル数が短く表示されます。以降は変更のたびに小さくコミットします（例）。

```bash
git add docs/requirements_spec.md
git commit -m "要件定義: 印刷の対応端末を両対応に確定"
```

## 2. 非公開リポジトリを作って push

**🔐** GitHub で新規リポジトリを作成します。設定は次のとおり。

- リポジトリ名：`katagami`（`dev` は付けない。`dev` はローカルの入れ物フォルダで、プロジェクト名ではない）
- Visibility：**必ず「Private」**
- **Add README / Add .gitignore / Add license は「付けない（空で作成）」** — ローカルに既にあるため。GitHub側で付けると最初のコミットが二重になり、push時に衝突してエラーになります。

作成後、リモートに接続して push します（`<あなたのID>` は自分のGitHub ID。例では `apricot626`）。

```bash
git remote add origin https://github.com/<あなたのID>/katagami.git
git branch -M main
git push -u origin main
```
**🔐** 初回 push で認証を求められます（ブラウザ認証／`gh auth login`／Personal Access Token のいずれか）。

> これで非公開のまま、コードとドキュメントが版管理されます。Markdownのドキュメントは GitHub 上できれいに表示されます。

## 3. 進行管理に使う（任意だが学習向き）
- **Issues**：機能アイデア・バグ・タスクを1件ずつ起票。`docs/backlog.md` の項目を Issue 化してもよい。
- **Labels**：`feature` `bug` `docs` などで分類。
- **Milestones**：憲章のフェーズ（1〜6）に対応させる。
- **Projects**（カンバン）：To do / Doing / Done で見える化。

## 日々の流れ（例）
1. やることを Issue に書く
2. ブランチを切る（任意）：`git switch -c feature/pdf-export`
3. 変更してコミット：`git commit -m "..."`
4. push：`git push`
5. 区切りで要件定義・憲章を更新し、版を上げてコミット

---

## サイトを公開したくなったら（別フェーズ）
非公開リポジトリのままなら、無料で公開する手段は次のいずれか：
- **Cloudflare Pages / Netlify**：非公開リポジトリと連携して無料デプロイ可（**🔐 連携にサービス登録**）
- **公開用の別リポジトリ**：公開してよいファイルだけを別の公開リポジトリに置き、GitHub Pages で公開
- 独自ドメインは **💴 費用** が発生（着手前に判断）

---

## 困ったとき
| 症状 | 確認 |
|---|---|
| `cd` で no such file | フォルダの場所を確認。`ls ~/Desktop/dev` で `katagami` があるか |
| `command not found: #` | コメント行を貼っている。コマンド行だけ貼る |
| push で `rejected`（衝突） | GitHub側でREADME等を付けてしまった可能性。空で作り直すか `git pull --rebase` |
| push で認証エラー | `gh auth login` か Personal Access Token |
| 間違って公開リポジトリで作った | Settings → General → Danger Zone → Change visibility で Private に変更 |
| ドキュメントの図表が崩れる | GitHub の Markdown プレビューで確認、必要ならテーブル記法を調整 |
