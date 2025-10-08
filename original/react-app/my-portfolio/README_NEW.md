# My Portfolio

> React + TypeScript + Prisma で構築したダイナミックなポートフォリオサイト

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue.svg)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-blue.svg)](https://www.prisma.io/)

## ✨ 特徴

- 📱 **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応
- 🎨 **モダンUI** - TailwindCSS + Framer Motionによる美しいアニメーション
- 🗄️ **データベース連携** - Prisma PostgreSQLでリアルタイムデータ管理
- ⚡ **高速表示** - React 19 + TypeScriptによる最適化
- 🔧 **編集機能** - ブラウザから技術スキル・職歴の管理が可能

## 🚀 クイックスタート

### 前提条件
- Node.js 16+ 
- npm または yarn

### インストール・実行

```bash
# 依存関係インストール
npm install

# 環境変数設定（.envファイルのDATABASE_URLが設定済み）

# データベースセットアップ
npx prisma migrate dev
npx prisma db seed

# 開発サーバー起動
npm start
```

**アクセスURL:**
- 開発サーバー: http://localhost:3000  
- データベース管理: `npx prisma studio` → http://localhost:5556

## 🛠 技術スタック

### フロントエンド
- **React 19.1.1** - UIライブラリ
- **TypeScript** - 型安全性
- **TailwindCSS** - スタイリング
- **Framer Motion** - アニメーション
- **React Router** - ルーティング

### バックエンド
- **Prisma** - ORM・データベースツール
- **PostgreSQL** - データベース（Prisma Postgres Cloud）
- **Prisma Studio** - データベース管理GUI

## 🎯 主要機能

### Aboutページ（データベース連携）
- **技術スキル表示**
  - カテゴリ別（言語/ライブラリ/DB/タスク管理）
  - 経験年数プログレスバー
  - 編集モード切り替え

- **職歴タイムライン**  
  - 動的データ表示
  - 技術スタック表示
  - 詳細な業務内容・成果

### その他のページ
- **Home**: アニメーション付きランディング
- **Projects**: フィルター付きポートフォリオギャラリー  
- **Contact**: バリデーション付きお問い合わせフォーム

## 🎮 開発コマンド

```bash
# 開発サーバー起動
npm start

# データベース管理GUI
npx prisma studio

# マイグレーション作成
npx prisma migrate dev --name "変更内容"

# 初期データ投入
npx prisma db seed

# プロダクションビルド
npm run build
```

## 📚 詳細ドキュメント

- **[プロジェクト実装記録](PROJECT_IMPLEMENTATION_RECORD.md)** - 詳細な実装履歴・技術選定理由
- **[技術実装ガイド](TECHNICAL_IMPLEMENTATION_GUIDE.md)** - 開発者向け実装詳細・コード例
- **[データベース移行ガイド](DATABASE_MIGRATION_GUIDE.md)** - DB移行・設定手順
- **[Supabaseセットアップ](SUPABASE_SETUP.md)** - 代替データベース設定

## 🗄️ データベース構成

**Prisma Postgres Cloud** を使用し、以下のテーブルで構成：

- **Skill** - 技術スキル（React, TypeScript等 14件）
- **Experience** - 職歴情報（2011年-現在 4件）

データはPrisma Studioで視覚的に管理可能です。

## 📱 レスポンシブ対応

- **モバイル**: 1カラムレイアウト
- **タブレット**: 2カラムレイアウト  
- **デスクトップ**: 3カラムレイアウト

## 🌐 デプロイ対応

Vercel等のプラットフォームで簡単にデプロイ可能。環境変数`DATABASE_URL`の設定のみで動作します。

## 📝 今後の実装予定

- [ ] 管理画面での編集機能完成
- [ ] 認証機能追加
- [ ] テストカバレッジ向上
- [ ] PWA対応
- [ ] SEO最適化

---

**作成期間**: 2025年9月24日-27日  
**Create React App** ベースで構築