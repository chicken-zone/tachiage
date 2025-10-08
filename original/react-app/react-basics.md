# React基礎学習ノート

## 1. コンポーネントの基礎

### 関数コンポーネント
```tsx
// 基本的な関数コンポーネント
const Greeting = () => {
  return <h1>こんにちは！</h1>;
};

// propsを受け取るコンポーネント
interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps) => {
  return <h1>こんにちは、{name}さん！</h1>;
};
```

### コンポーネントの特徴
- 必ず大文字で始める
- JSX（またはTSX）を返す
- 単一のルート要素を返す必要がある

## 2. Props

### Propsの基本
- 読み取り専用
- 親から子へのデータ伝達
- TypeScriptでの型定義が重要

### 例
```tsx
interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card = ({ title, description, onClick }: CardProps) => {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
```

## 3. State

### useState Hook
```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
```

### stateの更新規則
- 直接変更しない
- 前の状態に依存する場合は関数形式を使用
- オブジェクトや配列は新しい参照を作成

## 4. 副作用（useEffect）

### 基本的な使い方
```tsx
// マウント時のみ実行
useEffect(() => {
  // 処理
}, []);

// 依存配列の値が変更されたときに実行
useEffect(() => {
  // 処理
}, [依存する値]);

// クリーンアップ
useEffect(() => {
  // セットアップ
  return () => {
    // クリーンアップ
  };
}, []);
```

## 5. イベント処理

### イベントハンドラ
```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // 処理
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // 処理
};
```

## 重要な注意点

1. パフォーマンス最適化
   - メモ化（useMemo, useCallback）
   - 適切なキーの使用
   - 不要な再レンダリングの防止

2. コンポーネントの分割
   - 単一責任の原則
   - 再利用可能性
   - 可読性

3. TypeScriptの活用
   - 厳密な型定義
   - インターフェースの活用
   - 型推論の活用

## 学習の進め方

1. 基本概念の理解
2. 小さなコンポーネントの作成
3. 状態管理の実践
4. 実際のアプリケーションでの応用

## 次のステップ
- カスタムHookの作成
- コンテキストの使用
- エラー処理
- パフォーマンス最適化
