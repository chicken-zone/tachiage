# React Router学習ノート

## 1. 基本セットアップ

### インストール
```bash
npm install react-router-dom
```

### 基本的なルーティング設定
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 2. ナビゲーションコンポーネント

### Link コンポーネント
```tsx
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">ホーム</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">お問い合わせ</Link>
    </nav>
  );
};
```

### NavLink の使用
```tsx
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink 
        to="/"
        className={({ isActive }) => 
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        ホーム
      </NavLink>
    </nav>
  );
};
```

## 3. 動的ルーティング

### URLパラメータの使用
```tsx
// ルート定義
<Route path="/products/:id" element={<ProductDetail />} />

// パラメータの取得
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  return <div>商品ID: {id}</div>;
};
```

### クエリパラメータ
```tsx
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  return (
    <div>
      <h1>商品一覧: {category}</h1>
      <button onClick={() => setSearchParams({ category: 'electronics' })}>
        電化製品を表示
      </button>
    </div>
  );
};
```

## 4. プログラムによるナビゲーション

### useNavigate フック
```tsx
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ログイン処理
    if (success) {
      navigate('/dashboard');
    }
  };

  return <form onSubmit={handleSubmit}>{/* フォーム要素 */}</form>;
};
```

## 5. Protected Routes

### 認証ルートの実装
```tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuth(); // カスタムフック
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

// 使用例
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 6. ネストされたルート

### レイアウトとネスト
```tsx
const Layout = () => {
  return (
    <div>
      <header>{/* ヘッダー */}</header>
      <Outlet />
      <footer>{/* フッター */}</footer>
    </div>
  );
};

// ルート設定
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Route>
</Routes>
```

## 7. エラーハンドリング

### 404ページ
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### エラーバウンダリー
```tsx
<Routes>
  <Route
    element={
      <ErrorBoundary fallback={<ErrorPage />}>
        <Layout />
      </ErrorBoundary>
    }
  >
    {/* ルート */}
  </Route>
</Routes>
```

## 8. データローディング

### useLoaderData の使用
```tsx
// ローダー関数
export async function loader() {
  const products = await fetchProducts();
  return { products };
}

// コンポーネント
import { useLoaderData } from 'react-router-dom';

const Products = () => {
  const { products } = useLoaderData();
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## 学習の進め方

1. 基本的なルーティングの実装
2. ナビゲーションの追加
3. 動的ルーティングの理解
4. 認証とProtected Routes
5. エラーハンドリングの実装

## 次のステップ
- メモリルーターの使用
- テスト方法の習得
- パフォーマンス最適化
- SEO対策