# Supabaseを使用したデータベースセットアップ手順

## 1. Supabaseアカウント作成
1. https://supabase.com にアクセス
2. GitHubアカウントでサインアップ
3. 新しいプロジェクトを作成

## 2. データベースURL取得
1. プロジェクトダッシュボード → Settings → Database
2. Connection stringをコピー
3. パスワードを設定して完全なURLを取得

## 3. 環境変数設定
.envファイルのDATABASE_URLを更新:
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]/postgres?pgbouncer=true&connection_limit=1"
```

## 4. スキーマ更新
prisma/schema.prismaのdatasourceを変更:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 5. マイグレーション実行
```bash
npx prisma migrate dev --name init
npx prisma db seed
```