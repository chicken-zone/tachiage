import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

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
  responsibilities: string | null;
  achievements: string | null;
  technologies: string | null;
  isCurrentJob: boolean;
  sortOrder: number;
}

// テスト用のローカルデータ
const mockSkills: Skill[] = [
  // 言語
  { id: 1, name: 'React', years: 2, maxYears: 3, category: '言語' },
  { id: 2, name: 'Next.js', years: 2, maxYears: 3, category: '言語' },
  { id: 3, name: 'TypeScript', years: 2, maxYears: 3, category: '言語' },
  // ライブラリ
  { id: 4, name: 'Jest', years: 0.5, maxYears: 3, category: 'ライブラリ' },
  { id: 5, name: 'Testing Library', years: 2, maxYears: 3, category: 'ライブラリ' },
  { id: 6, name: 'TailwindCSS', years: 2, maxYears: 3, category: 'ライブラリ' },
  { id: 7, name: 'Styled Components', years: 2, maxYears: 3, category: 'ライブラリ' },
  { id: 8, name: 'Prisma', years: 1, maxYears: 3, category: 'ライブラリ' },
  { id: 9, name: 'Cypress', years: 0.5, maxYears: 3, category: 'ライブラリ' },
  // DB
  { id: 10, name: 'NoSQL (Firestore)', years: 0.5, maxYears: 3, category: 'DB' },
  { id: 11, name: 'SQL (Supabase)', years: 0.5, maxYears: 3, category: 'DB' },
  // タスク管理
  { id: 12, name: 'Jira', years: 1, maxYears: 3, category: 'タスク管理' },
  { id: 13, name: 'Notion', years: 1, maxYears: 3, category: 'タスク管理' },
  { id: 14, name: 'Confluence', years: 1, maxYears: 3, category: 'タスク管理' },
];

const mockExperiences: Experience[] = [
  {
    id: 1,
    title: 'フロントエンジニア',
    company: '監視関係の設定業務システムのマイグレーション',
    startDate: '2025年3月',
    endDate: null,
    employmentType: '個人事業主',
    businessType: '外注先・システム開発',
    description: 'フロントエンドからバックエンドまで実装・複数のライブラリやツールを使用した実装',
    responsibilities: 'PLと協調しながら、画面設計・要件整理を実施|Next.jsを用いたSPA構築|TailwindCSS、Styled-componentsによるUI設計|React Hooksを使用した状態管理ロジック実装|Zodによるフォームバリデーション機能実装|Puppeteerによる結合テストの構築|JestとTesting Libraryによるユニットテストの実施',
    technologies: '["TypeScript","Next.js","PostgreSQL","Vercel"]',
    achievements: null,
    isCurrentJob: true,
    sortOrder: 1
  },
  {
    id: 2,
    title: 'フロントエンジニア',
    company: '海外ECサイトの販売管理DXのEtoC向け自社サービス開発および保守',
    startDate: '2024年2月',
    endDate: '2025年2月',
    employmentType: 'アルバイト',
    businessType: '販売管理システムのサービス提供',
    description: '主にフロントエンド技術を中心・複数のライブラリやツールを使用した実装',
    responsibilities: 'ReactおよびNext.jsを用いた UI設計・実装|shadcn、Redux、TailwindCSS、Styled-componentsなどのライブラリを活用|ユニットテストやE2Eテストを Jest と Testing Library で実施|Prettier、ESLintを用いたコードフォーマットの徹底|HuskyやLint-stagedを組み合わせたコードチェックフローの導入（CI自動化）',
    achievements: 'ユーザーフィードバックからのバグ改善対応（夜の時間限定、ほとんど改め）',
    technologies: '["React","TypeScript","Next.js","Redux","TailwindCSS","Styled-components","Jest","Testing Library","Prettier","ESLint","Husky","Lint-staged"]',
    isCurrentJob: false,
    sortOrder: 2
  },

];

const About: React.FC = () => {
  // 一時的にカスタムフックを使用せず、直接モックデータを使用
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false); // モックデータなのでloadingは不要
  
  // 将来的にはこれらのフックでAPIからデータを取得
  // const { skills, loading: skillsLoading, error: skillsError, refetch: refreshSkills } = useSkills();
  // const { experiences, loading: experiencesLoading, error: experiencesError } = useExperiences();

  // Prismaはクライアントサイドで動作しないため、モックデータを使用
  // 将来的にはNext.jsのAPIルートまたは別のバックエンドからデータを取得
  const displaySkills = mockSkills;
  const experiences = mockExperiences;
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">データを読み込んでいます...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          className="text-4xl font-bold text-center flex-1"
          variants={fadeIn}
        >
          私について
        </motion.h1>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-4 py-2 rounded-md transition-colors ${
            isEditMode 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isEditMode ? '編集終了' : '編集モード'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Professional Summary */}
        <motion.section 
          variants={fadeIn}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">プロフィール概要</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            情熱的なフルスタック開発者として、ReactとTypeScriptを使用したモダンなWebアプリケーションの構築を専門としています。
            Web開発の旅は、直感的なユーザーエクスペリエンスの創造への深い好奇心から始まり、
            フロントエンドとバックエンドの両方の技術を包括する総合的なスキルセットへと発展しました。
          </p>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold mb-4">価値観</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">🎯</span>
                クリーンで保守性の高いコード
              </li>
              <li className="flex items-center">
                <span className="mr-2">🤝</span>
                協力的な問題解決
              </li>
              <li className="flex items-center">
                <span className="mr-2">📚</span>
                継続的な学習
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section 
          variants={fadeIn}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">
            技術スキル
            <span className="text-xs text-gray-400 ml-2">
              ({displaySkills.length}件)
            </span>
          </h2>
          {['言語', 'ライブラリ', 'DB', 'タスク管理'].map(category => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{category}</h3>
              <div className="space-y-3">
                {displaySkills.filter(skill => skill.category === category).map((skill) => {
                  const percentage = (skill.years / skill.maxYears) * 100;
                  const yearText = skill.years < 1 ? `${skill.years * 12}カ月` : `${skill.years}年`;
                  return (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{yearText}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Experience Timeline */}
        <motion.section 
          variants={fadeIn}
          className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              職歴
              <span className="text-xs text-gray-400 ml-2">
                ({experiences.length}件)
              </span>
            </h2>
            {isEditMode && (
              <button
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                onClick={() => {
                  // 新しい職歴追加のロジック
                  console.log('Add new experience');
                }}
              >
                + 職歴追加
              </button>
            )}
          </div>
          <div className="space-y-8">
            {experiences.map((experience, index) => {
              const technologies = experience.technologies 
                ? JSON.parse(experience.technologies) 
                : [];
              const responsibilities = experience.responsibilities 
                ? experience.responsibilities.split('|') 
                : [];
              
              return (
                <div 
                  key={experience.id} 
                  className={`relative pl-8 border-l-2 ${
                    experience.isCurrentJob ? 'border-blue-500' : 'border-gray-400'
                  }`}
                >
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                    experience.isCurrentJob ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  
                  {isEditMode && (
                    <div className="absolute top-0 right-0 space-x-2">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                        onClick={() => {
                          // 編集ロジック
                          console.log('Edit experience', experience.id);
                        }}
                      >
                        編集
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        onClick={() => {
                          // 削除ロジック
                          console.log('Delete experience', experience.id);
                        }}
                      >
                        削除
                      </button>
                    </div>
                  )}

                  <h3 className="font-semibold text-xl">{experience.title}</h3>
                  <p className="text-gray-500">
                    {experience.company} • {experience.startDate} - {experience.endDate || '現在'}
                  </p>
                  <p className="text-sm text-blue-600 mb-2">
                    {experience.employmentType} | {experience.businessType}
                  </p>
                  
                  <div className="mt-3 text-gray-600 space-y-2">
                    <p>{experience.description}</p>
                    
                    {responsibilities.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">主な業務内容：</h4>
                        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                          {responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {experience.achievements && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">成果・学び：</h4>
                        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {experience.achievements.split('|').map((achievement, idx) => (
                            <p key={idx} className="mb-1">{achievement}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {technologies.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">技術スタック：</h4>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech: string, idx: number) => (
                            <span 
                              key={idx}
                              className={`px-2 py-1 text-xs rounded ${
                                experience.isCurrentJob 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;