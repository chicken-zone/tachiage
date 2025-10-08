# TailwindCSS学習ノート

## 1. セットアップと基本設定

### プロジェクトへの導入
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.js の基本設定
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 2. 基本的なユーティリティクラス

### レイアウト
```tsx
// コンテナとパディング
<div className="container mx-auto px-4">
  {/* コンテンツ */}
</div>

// フレックスボックス
<div className="flex items-center justify-between">
  {/* フレックスアイテム */}
</div>

// グリッド
<div className="grid grid-cols-3 gap-4">
  {/* グリッドアイテム */}
</div>
```

### スペーシング
```tsx
// マージンとパディング
<div className="m-4 p-4">
<div className="mt-4 mb-4">
<div className="px-4 py-2">
```

### タイポグラフィ
```tsx
// フォントサイズとスタイル
<h1 className="text-2xl font-bold">
<p className="text-base text-gray-600">
<span className="italic underline">
```

## 3. レスポンシブデザイン

### ブレークポイント
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

```tsx
// レスポンシブな要素
<div className="w-full md:w-1/2 lg:w-1/3">
<div className="text-sm md:text-base lg:text-lg">
```

## 4. コンポーネントパターン

### カード
```tsx
const Card = () => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h2 className="text-xl font-semibold mb-2">タイトル</h2>
    <p className="text-gray-600">説明文</p>
  </div>
);
```

### ボタン
```tsx
const Button = ({ variant = "primary" }) => {
  const baseStyle = "px-4 py-2 rounded-md transition-colors";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`}>
      ボタン
    </button>
  );
};
```

## 5. カスタマイズ

### テーマの拡張
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0066cc',
          dark: '#004d99',
        },
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
}
```

## 6. 最適化とベストプラクティス

### パフォーマンス最適化
1. JIT（Just-in-Time）モードの活用
2. 未使用クラスの除去
3. PurgeCSS の設定

### コード整理
```tsx
// 共通クラスの抽出
const commonStyles = {
  card: "bg-white rounded-lg shadow-md p-6",
  heading: "text-2xl font-bold text-gray-800 mb-4",
  paragraph: "text-gray-600 leading-relaxed"
};

// 使用例
<div className={commonStyles.card}>
  <h2 className={commonStyles.heading}>
  <p className={commonStyles.paragraph}>
</div>
```

## 7. アニメーションと移行効果

### 基本的なアニメーション
```tsx
// ホバー効果
<div className="transform hover:scale-105 transition-transform">

// フェード効果
<div className="opacity-0 hover:opacity-100 transition-opacity">
```

## 学習の進め方

1. 基本的なユーティリティクラスの習得
2. レスポンシブデザインの実践
3. コンポーネントの作成
4. カスタマイズとテーマ設定
5. 最適化とベストプラクティスの適用

## 次のステップ
- アニメーションの高度な活用
- カスタムプラグインの作成
- デザインシステムの構築
- パフォーマンス最適化