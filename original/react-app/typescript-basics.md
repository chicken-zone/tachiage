# TypeScript基礎学習ノート

## 1. 基本的な型

### プリミティブ型
```typescript
let name: string = "山田";
let age: number = 25;
let isStudent: boolean = true;
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

### 配列と型定義
```typescript
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
```

### オブジェクト型
```typescript
interface Person {
  name: string;
  age: number;
  email?: string; // オプショナルプロパティ
}

const user: Person = {
  name: "田中",
  age: 30
};
```

## 2. インターフェースと型エイリアス

### インターフェース
```typescript
interface Vehicle {
  brand: string;
  model: string;
  year: number;
}

interface Car extends Vehicle {
  type: "sedan" | "suv" | "sports";
  doors: number;
}
```

### 型エイリアス
```typescript
type Point = {
  x: number;
  y: number;
};

type UserRole = "admin" | "user" | "guest";
```

## 3. ジェネリクス

### 基本的な使い方
```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 使用例
const num = identity<number>(123);
const str = identity<string>("Hello");
```

### ジェネリックインターフェース
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "鈴木" },
  status: 200,
  message: "Success"
};
```

## 4. 関数の型定義

### 関数の型
```typescript
type MathFunction = (x: number, y: number) => number;

const add: MathFunction = (x, y) => x + y;
const subtract: MathFunction = (x, y) => x - y;
```

### オーバーロード
```typescript
function process(x: number): number;
function process(x: string): string;
function process(x: any): any {
  if (typeof x === "number") {
    return x * 2;
  }
  return x.toUpperCase();
}
```

## 5. 高度な型機能

### ユニオン型とインターセクション型
```typescript
type StringOrNumber = string | number;
type NameAndAge = { name: string } & { age: number };
```

### タイプガード
```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

## 6. Reactでの活用

### コンポーネントProps
```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      className={variant}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
```

## 学習のポイント

1. 型安全性
   - 厳密な型チェック
   - コンパイル時のエラー検出
   - 型推論の活用

2. 開発効率
   - エディタのサポート
   - コード補完
   - リファクタリングのしやすさ

3. コード品質
   - 可読性の向上
   - ドキュメントとしての役割
   - バグの予防

## 次のステップ
- 型定義ファイル（.d.ts）の作成
- デコレータの使用
- 高度な型テクニック
- テスト時の型活用
