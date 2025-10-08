## 環境構築

### React開発環境の構築方法

**方法1: ホスト側Node.js使用**
- ホストにNode.jsをインストール → `npm install react`
- メリット: 直接的、シンプル
- デメリット: ホスト・Docker間でNode.jsバージョン差異による問題の可能性

**方法2: Docker完全移行（推奨）**
- ホストにNode.js不要
- 構築手順:
  1. `docker-compose.yml` 作成（コンテナ管理）
  2. `front-web/Dockerfile` 作成（イメージ定義）
  3. `.devcontainer/devcontainer.json` 設定（VS Code統合）
  4. VS Code左下「><」→「Reopen in Container」で起動

### 必要なファイル構成
```
project/
├── docker-compose.yml
├── .devcontainer/
│   └── devcontainer.json
└── front-web/
    ├── Dockerfile
    └── (Reactアプリ)
```

### 重要な設定ポイント
- **ポート設定**: `3000:3000` でReact開発サーバーを公開
- **ボリュームマウント**: ソースコード変更のリアルタイム反映
- **Node.jsバージョン**: プロジェクト要件に合わせて固定
- **package.json**: 依存関係とスクリプトの管理

### トラブルシューティング
- コンテナが起動しない → ポート競合確認
- ホットリロードが効かない → polling設定追加
- パーミッション問題 → ユーザーID設定確認

### 便利なDockerコマンド
- `docker-compose up -d` : バックグラウンド起動
- `docker-compose logs -f` : ログ確認
- `docker-compose down` : コンテナ停止・削除
- `docker system prune` : 不要イメージ削除

> Docker方式により環境の一貫性とポータビリティを確保

