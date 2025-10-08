import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={stagger}
      className="max-w-6xl mx-auto"
    >
      <motion.h1 
        variants={fadeIn}
        className="text-4xl font-bold mb-8"
      >
        ポートフォリオへようこそ
      </motion.h1>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={fadeIn}>
          <h2 className="text-2xl font-semibold mb-4">私について</h2>
          <p className="text-gray-600 bg-white shadow-sm rounded-lg p-6">
            React、TypeScript、モダンなWeb技術に精通した情熱的な開発者です。
            ユーザーにとって価値のあるアプリケーションの構築を目指しています。
          </p>
        </motion.div>

        <motion.div variants={fadeIn}>
          <h2 className="text-2xl font-semibold mb-4">注目のプロジェクト</h2>
          <div className="space-y-4">
            <motion.div 
              variants={fadeIn}
              className="bg-white p-6 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-bold text-xl mb-2">Eコマースプラットフォーム</h3>
              <p className="text-gray-600">フルスタックのEコマースサイトで、リアルタイムの在庫管理と安全な決済処理を実装</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white p-6 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-bold text-xl mb-2">タスク管理アプリ</h3>
              <p className="text-gray-600">リアルタイム更新とチーム機能を持つコラボレーション型タスク管理アプリケーション</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;