# 開発者向け技術実装ガイド

## 🔧 コア技術実装

### 1. データベース接続設定

#### Prisma Client初期化 (`src/lib/prisma.ts`)
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### データベースサービス (`src/lib/database.ts`)
```typescript
// スキル操作
export const skillService = {
  async getAllSkills() {
    return await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }]
    });
  },
  async createSkill(data) { /* ... */ },
  async updateSkill(id, data) { /* ... */ },
  async deleteSkill(id) { /* ... */ }
};

// 職歴操作
export const experienceService = {
  async getAllExperiences() { /* ... */ },
  async createExperience(data) { /* ... */ },
  // その他CRUD操作
};
```

### 2. React コンポーネント実装

#### 動的データ表示 (`src/pages/About.tsx`)
```typescript
const About: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [skillsData, experiencesData] = await Promise.all([
        skillService.getAllSkills(),
        experienceService.getAllExperiences()
      ]);
      setSkills(skillsData);
      setExperiences(experiencesData);
    };
    fetchData();
  }, []);

  // JSXでの動的レンダリング
  return (
    <div>
      {/* スキル表示 */}
      {['言語', 'ライブラリ', 'DB', 'タスク管理'].map(category => (
        <div key={category}>
          {skills.filter(skill => skill.category === category).map(skill => (
            <div key={skill.id}>
              <span>{skill.name}</span>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.years / skill.maxYears) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* 職歴表示 */}
      {experiences.map(exp => (
        <div key={exp.id}>
          <h3>{exp.title}</h3>
          <p>{exp.company}</p>
          {/* 技術スタック表示 */}
          {exp.technologies && JSON.parse(exp.technologies).map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>
      ))}
    </div>
  );
};
```

### 3. アニメーション実装

#### Framer Motion設定
```typescript
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// コンポーネントでの使用
<motion.div
  variants={fadeIn}
  initial="initial"
  animate="animate"
  className="content"
>
  {/* コンテンツ */}
</motion.div>
```

#### プログレスバーアニメーション
```typescript
<motion.div
  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
  initial={{ width: 0 }}
  animate={{ width: `${percentage}%` }}
  transition={{ duration: 1, delay: 0.2 }}
/>
```

### 4. TailwindCSS カスタマイズ

#### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
```

#### レスポンシブクラス使用例
```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- 1列→2列→3列のレスポンシブグリッド -->
</div>
```

## 📊 データ構造と型定義

### TypeScript インターフェース
```typescript
interface Skill {
  id: number;
  name: string;
  years: number;
  maxYears: number;
  category: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  employmentType: string;
  businessType: string;
  description: string;
  responsibilities: string | null;  // '|'区切り文字列
  technologies: string | null;      // JSON配列文字列
  isCurrentJob: boolean;
  sortOrder: number;
}
```

### データベーススキーマ
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Skill {
  id        Int     @id @default(autoincrement())
  name      String
  years     Float
  maxYears  Float   @default(3)
  category  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Experience {
  id            Int      @id @default(autoincrement())
  title         String
  company       String
  startDate     String
  endDate       String?
  employmentType String
  businessType  String
  description   String
  responsibilities String?
  achievements  String?
  technologies  String?
  isCurrentJob  Boolean @default(false)
  sortOrder     Int     @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 🎛 開発・デバッグ手順

### 1. 開発環境起動
```bash
# データベース管理画面
npx prisma studio  # localhost:5556

# 開発サーバー
npm start  # localhost:3000
```

### 2. データベース操作コマンド
```bash
# スキーマ変更後のマイグレーション
npx prisma migrate dev --name "変更内容の説明"

# Prisma Client再生成
npx prisma generate

# 初期データ再投入
npx prisma db seed

# データベースリセット（開発時のみ）
npx prisma migrate reset
```

### 3. よくある問題と解決法

#### Problem: Prisma Client型エラー
```bash
# 解決: Client再生成
npx prisma generate
```

#### Problem: マイグレーションエラー
```bash
# 解決: 既存マイグレーション削除後、新規作成
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

#### Problem: 接続エラー
```bash
# 解決: 環境変数確認
echo $DATABASE_URL
```

## 🚀 パフォーマンス最適化

### 1. データベースクエリ最適化
```typescript
// 悪い例: N+1クエリ
const skills = await prisma.skill.findMany();
for (const skill of skills) {
  // 個別クエリが発生
}

// 良い例: 一括取得
const skills = await prisma.skill.findMany({
  orderBy: [{ category: 'asc' }, { name: 'asc' }]
});
```

### 2. React コンポーネント最適化
```typescript
// useMemo でキャッシュ
const filteredSkills = useMemo(
  () => skills.filter(skill => skill.category === selectedCategory),
  [skills, selectedCategory]
);

// useCallback でイベントハンドラ最適化
const handleEdit = useCallback((id: number) => {
  // 編集ロジック
}, []);
```

## 🔒 セキュリティ考慮事項

### 1. 環境変数管理
```bash
# .env (Git追跡対象外)
DATABASE_URL="sensitive_connection_string"

# .env.example (Git追跡対象)
DATABASE_URL="prisma+postgres://your-connection-string"
```

### 2. 入力値検証（今後実装予定）
```typescript
import { z } from 'zod';

const SkillSchema = z.object({
  name: z.string().min(1).max(50),
  years: z.number().min(0).max(20),
  category: z.string().min(1),
});

// 使用例
const validatedData = SkillSchema.parse(inputData);
```

## 📦 ビルド・デプロイ

### 1. プロダクションビルド
```bash
npm run build
# → build/ フォルダに静的ファイル生成
```

### 2. Vercelデプロイ設定例
```json
// vercel.json
{
  "env": {
    "DATABASE_URL": "@database_url"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database_url"
    }
  }
}
```

## 🧪 テスト設定（今後実装予定）

### 1. 単体テスト例
```typescript
// src/__tests__/About.test.tsx
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('renders skills section', () => {
  render(<About />);
  expect(screen.getByText('技術スキル')).toBeInTheDocument();
});
```

### 2. データベーステスト
```typescript
// prisma/__tests__/skill.test.ts
import { skillService } from '../src/lib/database';

test('creates skill', async () => {
  const skill = await skillService.createSkill({
    name: 'React',
    years: 2,
    maxYears: 3,
    category: '言語'
  });
  expect(skill.name).toBe('React');
});
```

---

このドキュメントは技術実装の詳細を記録しており、将来の開発作業や他の開発者への引き継ぎに活用できます。