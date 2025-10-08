import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 技術スキルの初期データ
  const skills = [
    // 言語
    { name: 'React', years: 2, maxYears: 3, category: '言語' },
    { name: 'Next.js', years: 2, maxYears: 3, category: '言語' },
    { name: 'TypeScript', years: 2, maxYears: 3, category: '言語' },
    // ライブラリ
    { name: 'Jest', years: 0.5, maxYears: 3, category: 'ライブラリ' },
    { name: 'Testing Library', years: 2, maxYears: 3, category: 'ライブラリ' },
    { name: 'TailwindCSS', years: 2, maxYears: 3, category: 'ライブラリ' },
    { name: 'Styled Components', years: 2, maxYears: 3, category: 'ライブラリ' },
    { name: 'Prisma', years: 1, maxYears: 3, category: 'ライブラリ' },
    { name: 'Cypress', years: 0.5, maxYears: 3, category: 'ライブラリ' },
    // DB
    { name: 'NoSQL (Firestore)', years: 0.5, maxYears: 3, category: 'DB' },
    { name: 'SQL (Supabase)', years: 0.5, maxYears: 3, category: 'DB' },
    // タスク管理
    { name: 'Jira', years: 1, maxYears: 3, category: 'タスク管理' },
    { name: 'Notion', years: 1, maxYears: 3, category: 'タスク管理' },
    { name: 'Confluence', years: 1, maxYears: 3, category: 'タスク管理' },
  ]

  // 職歴の初期データ
  const experiences = [
    {
      title: 'フロントエンジニア',
      company: '監視関係の設定業務システムのマイグレーション',
      startDate: '2025年3月',
      endDate: null,
      employmentType: '個人事業主',
      businessType: '外注先・システム開発',
      description: 'フロントエンドからバックエンドまで実装・複数のライブラリやツールを使用した実装',
      responsibilities: 'PLと協調しながら、画面設計・要件整理を実施|Next.jsを用いたSPA構築|TailwindCSS、Styled-componentsによるUI設計|React Hooksを使用した状態管理ロジック実装|Zodによるフォームバリデーション機能実装|Puppeteerによる結合テストの構築|JestとTesting Libraryによるユニットテストの実施',
      technologies: '["TypeScript","Next.js","PostgreSQL","Vercel"]',
      isCurrentJob: true,
      sortOrder: 1
    },
    {
      title: 'フロントエンジニア',
      company: '海外ECサイトの販売管理DXのEtoC向け自社サービス開発および保守',
      startDate: '2024年2月',
      endDate: '2025年2月',
      employmentType: 'アルバイト',
      businessType: '販売管理システムのサービス提供',
      description: '主にフロントエンド技術を中心・複数のライブラリやツールを使用した実装',
      responsibilities: 'ReactやNext.jsを用いたUI設計・実装|Shadcn、Redux、TailwindCSS、Styled-componentsなどのライブラリ活用|ユニットテストやE2Eテストを用いた品質向上|Prettier、ESLintを用いたコードフォーマットの統一|HuskyとLint-stagedを組み合わせたコードチェックフローの導入',
      technologies: '["React","Next.js","Firebase","NoSQL"]',
      isCurrentJob: false,
      sortOrder: 2
    },
    {
      title: '訪問営業',
      company: '株式会社日本郵便輸送',
      startDate: '2018年12月',
      endDate: '2024年1月',
      employmentType: '正社員',
      businessType: '郵便物の輸送サービス提供',
      description: '郵便局間のトラックでの輸送中心とした配車対応・貨物輸送を扱う部分企業への営業活動（アポイント獲得、見積もり作成、企業訪問および契約対応）',
      responsibilities: null,
      technologies: null,
      isCurrentJob: false,
      sortOrder: 3
    },
    {
      title: 'パチンコ店員',
      company: '株式会社ダイナム',
      startDate: '2011年10月',
      endDate: '2018年11月',
      employmentType: '正社員',
      businessType: 'パチンコ店のホール運営',
      description: 'パチンコホールのサービス業務（お客様対応、遊技説明、景品交換、金銭管理など）・ホール従業員として、主にメダル交換、景品カウンター対応、新人従業員の教育、ホール管理（リーダー業務）、店舗運営など',
      responsibilities: '店舗内従業員同士のコミュニケーション重要性を学習|現状把握により、あまりうまくいかない大きな問題に気付くきっかけや、そのための思考、振る舞い、言語化を学習',
      technologies: null,
      isCurrentJob: false,
      sortOrder: 4
    }
  ]

  console.log('Start seeding...')

  // スキルデータを挿入
  for (const skill of skills) {
    await prisma.skill.create({
      data: skill
    })
  }

  // 職歴データを挿入
  for (const experience of experiences) {
    await prisma.experience.create({
      data: experience
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })