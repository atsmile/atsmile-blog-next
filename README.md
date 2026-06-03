# ブログ

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss) ![microCMS](https://img.shields.io/badge/microCMS-headless_CMS-ff4d4d) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare)

microCMS公式のシンプルなブログテンプレートをベースにしたブログサイトです。

## URL

（デプロイ先のURLを記載）

## 技術スタック

- [Next.js 15](https://nextjs.org/) - Reactフレームワーク（App Router）
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- [Tailwind CSS v4](https://tailwindcss.com/) - スタイリング
- [microCMS](https://microcms.io/) - ヘッドレスCMS（記事・タグ管理）
- [Cloudflare Workers](https://workers.cloudflare.com/) - ホスティング（OpenNext経由）
- [Playwright](https://playwright.dev/) - E2Eテスト

## 機能

- 記事一覧・記事詳細
- タグ絞り込み
- キーワード検索
- ページネーション
- 下書きプレビュー
- シンタックスハイライト（highlight.js）
- E2Eテスト（Playwright）

## ディレクトリ構成

```
app/
├── articles/
│   ├── page.tsx              # 記事一覧
│   └── [slug]/
│       └── page.tsx          # 記事詳細
├── p/
│   └── [current]/
│       └── page.tsx          # ページネーション
├── search/
│   ├── page.tsx              # 検索結果
│   └── p/[current]/
│       └── page.tsx          # 検索結果ページネーション
├── tags/
│   └── [tagId]/
│       ├── layout.tsx        # タグページレイアウト
│       ├── page.tsx          # タグ絞り込み一覧
│       └── p/[current]/
│           └── page.tsx      # タグ絞り込みページネーション
├── layout.tsx                # RootLayout
├── page.tsx                  # トップページ
├── not-found.tsx             # 404ページ
├── globals.css               # グローバルスタイル
└── favicon.ico
```

## 開発環境のセットアップ

### 環境変数の設定

ルート直下に `.env.local` を作成し、下記を設定してください。

```
MICROCMS_API_KEY=xxxxxxxxxx
MICROCMS_SERVICE_DOMAIN=xxxxxxxxxx
BASE_URL=http://localhost:3000
```

| 変数名 | 説明 |
| --- | --- |
| `MICROCMS_API_KEY` | microCMS管理画面「サービス設定 > APIキー」から確認 |
| `MICROCMS_SERVICE_DOMAIN` | `https://xxxxxxxx.microcms.io` の `xxxxxxxx` 部分 |
| `BASE_URL` | デプロイ先のURL（開発時は `http://localhost:3000`） |

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

## コマンド一覧

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動（http://localhost:3000） |
| `npm run build` | 本番ビルド |
| `npm run lint` | ESLintによるコードチェック |
| `npm run format` | Prettierによるコード整形 |
| `npm run preview` | Cloudflare Workers向けローカルプレビュー |
| `npm run deploy` | Cloudflare Workersへデプロイ |
| `npm run test:e2e` | Playwright E2Eテスト実行 |
| `npm run test:e2e:ui` | Playwright UIモードで実行 |

## 下書きプレビュー

microCMS管理画面「API設定 > 画面プレビュー」に以下を設定してください。

```
https://your-domain/api/preview?secret=YOUR_SECRET&id={CONTENT_ID}
```

設定後、コンテンツ編集画面で画面プレビューボタンが利用可能になります。

## CI/CD

GitHub ActionsでPR・mainへのpush時に以下を自動実行しています。

**E2Eテスト（`playwright.yml`）— PR時に実行**
- Playwrightによるブラウザテスト

**デプロイ（`deploy.yml`）— mainへのpushで実行**
- OpenNext経由でCloudflare Workersへ自動デプロイ

### GitHub Actionsのシークレット設定

| シークレット名 | 説明 |
| --- | --- |
| `MICROCMS_API_KEY` | microCMSのAPIキー |
| `MICROCMS_SERVICE_DOMAIN` | microCMSのサービスドメイン |
| `CLOUDFLARE_API_TOKEN` | CloudflareのAPIトークン |
| `CLOUDFLARE_ACCOUNT_ID` | CloudflareのアカウントID |
