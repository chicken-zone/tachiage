# Docker環境でReact開発環境構築

## 前提条件
- Docker Desktop がインストールされていること
- VS Code がインストールされていること
- VS Code の Dev Containers 拡張機能がインストールされていること

## 1. プロジェクト構造の作成

```
project/
├── docker-compose.yml
├── .devcontainer/
│   └── devcontainer.json
└── front-web/
    └── Dockerfile
```

## 2. docker-compose.yml の作成

```yaml
version: '3.8'
services:
  front-web:
    build:
      context: ./front-web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./front-web:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    stdin_open: true
    tty: true
```

## 3. Dockerfile の作成（front-web/Dockerfile）

```dockerfile
FROM node:18-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー（存在する場合）
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "start"]
```

## 4. .devcontainer/devcontainer.json の作成

```json
{
  "name": "React Development",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "front-web",
  "workspaceFolder": "/app",
  "shutdownAction": "stopCompose",
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "ms-vscode.vscode-typescript-next"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
    }
  },
  "postCreateCommand": "npm install"
}
```

## 5. 詳細な環境構築フロー

### フェーズ1: 基盤作成
**何をする:** プロジェクトディレクトリと基本構造を作成
```bash
mkdir my-react-project
cd my-react-project
mkdir front-web
mkdir .devcontainer
```
**できるもの:** 
```
my-react-project/
├── front-web/        ← Docker コンテナ用ディレクトリ
└── .devcontainer/    ← VS Code Dev Container設定用
```

---

### フェーズ2: Docker設定ファイル作成
**何をする:** `docker-compose.yml` をプロジェクトルートに作成
```yaml
version: '3.8'
services:
  front-web:
    build:
      context: ./front-web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./front-web:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    stdin_open: true
    tty: true
```
**できるもの:** コンテナの設計図が完成
- ポート3000でアクセス可能な設定
- ソースコード変更が即座に反映される設定
- ホットリロードが有効になる設定

---

### フェーズ3: コンテナイメージ定義
**何をする:** `front-web/Dockerfile` を作成
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
**できるもの:** Node.js 18環境のコンテナイメージ仕様
- Alpine Linuxベースで軽量
- 作業ディレクトリが `/app` に設定
- npm パッケージの自動インストール機能
- React開発サーバーの自動起動設定

---

### フェーズ4: VS Code統合設定
**何をする:** `.devcontainer/devcontainer.json` を作成
```json
{
  "name": "React Development",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "front-web",
  "workspaceFolder": "/app",
  "shutdownAction": "stopCompose",
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "ms-vscode.vscode-typescript-next"
      ]
    }
  }
}
```
**できるもの:** VS CodeとDockerの完全統合環境
- VS Code拡張機能の自動インストール
- コードフォーマッターの自動設定
- TypeScript サポートの有効化

---

### フェーズ5: VS Code でプロジェクト開始
**何をする:** VS Code でプロジェクトを開く
```bash
code .
```
**できるもの:** 
- VS Code が起動し、プロジェクトが表示される
- 左下に「><」マークが表示される（Dev Container利用可能）

---

### フェーズ6: Docker環境への移行
**何をする:** VS Code でコンテナ環境に入る
1. 左下「><」アイコンクリック
2. 「Reopen in Container」選択
3. 初回は数分待機（Dockerイメージビルド）

**できるもの:** 
- VS Code がコンテナ内で動作開始
- ターミナルがコンテナ内のLinux環境になる
- Node.js、npm が使用可能になる
- 左下表示が「Dev Container: React Development」に変更

---

### フェーズ7: React アプリケーション作成
**何をする:** コンテナ内でReactアプリを生成
```bash
npx create-react-app . --template typescript
```
**できるもの:** 
```
front-web/
├── public/
│   ├── index.html      ← メインHTMLファイル
│   └── favicon.ico     ← ファビコン
├── src/
│   ├── App.tsx         ← メインReactコンポーネント
│   ├── App.css         ← スタイルシート
│   ├── index.tsx       ← エントリーポイント
│   └── ...
├── package.json        ← 依存関係定義
└── tsconfig.json       ← TypeScript設定
```
- 完全なReact + TypeScript環境
- 必要なnpmパッケージ全て自動インストール済み

---

### フェーズ8: 開発サーバー起動と初期表示
**何をする:** 開発サーバーを起動
```bash
npm start
```
**できるもの:** 
- ターミナルに以下が表示:
  ```
  Compiled successfully!
  
  You can now view my-app in the browser.
  
  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
  ```
- ブラウザで `http://localhost:3000` にアクセス可能
- Reactのロゴが回転する初期画面が表示
- 「Edit src/App.tsx and save to reload.」メッセージ

---

### フェーズ9: 動作確認とホットリロード
**何をする:** `src/App.tsx` を編集してテスト
```tsx
// src/App.tsx の一部を変更
<p>
  Hello Docker React! {/* この行を追加 */}
  Edit <code>src/App.tsx</code> and save to reload.
</p>
```
**できるもの:** 
- ファイル保存と同時にブラウザが自動更新
- 変更内容が即座にブラウザに反映
- コンパイルエラーがあれば即座に表示
- VS Code内でTypeScriptの型チェックが有効

---

### 完成した環境の特徴
✅ **チーム共通環境**: 誰が実行しても同じ結果  
✅ **ホスト非依存**: Node.jsのローカルインストール不要  
✅ **即座の開発開始**: git cloneして即座にコーディング可能  
✅ **VS Code統合**: 拡張機能やデバッグ機能フル活用  
✅ **ホットリロード**: 変更が即座に反映される開発体験

## 6. 初期表示確認

### ブラウザでの確認
- ブラウザで `http://localhost:3000` にアクセス
- React のロゴと「Edit src/App.tsx and save to reload.」が表示される

### VS Code での確認
- VS Code のターミナルに「Local: http://localhost:3000」が表示
- ホットリロードが有効になり、ファイル保存時に自動更新

## 7. トラブルシューティング

### よくある問題と解決法

**問題1: ポート3000が使用中**
```bash
# 使用中のプロセス確認
netstat -ano | findstr :3000
# プロセス終了
taskkill /PID <プロセスID> /F
```

**問題2: ホットリロードが効かない**
- `CHOKIDAR_USEPOLLING=true` 環境変数が設定されているか確認
- ボリュームマウントが正しく設定されているか確認

**問題3: コンテナが起動しない**
```bash
# ログ確認
docker-compose logs front-web
# コンテナ再ビルド
docker-compose up --build
```

## 8. 便利なコマンド

### Docker操作
```bash
# バックグラウンド起動
docker-compose up -d

# ログ確認
docker-compose logs -f front-web

# コンテナ停止
docker-compose down

# 完全クリーンアップ
docker-compose down --volumes --rmi all
```

### パッケージ管理
```bash
# 新しいパッケージ追加
npm install <package-name>

# 依存関係更新
npm update

# package.json に基づいて再インストール
npm ci
```

## 9. 次のステップ

1. **ESLint/Prettier の設定**
2. **TailwindCSS の追加**
3. **React Router の導入**
4. **状態管理ライブラリの追加**
5. **API 連携の実装**

---

この環境により、チーム全体で一貫した開発環境を共有でき、「動かない」問題を大幅に削減できます。