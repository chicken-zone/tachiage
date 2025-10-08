import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Eコマースプラットフォーム",
    description: "リアルタイムの在庫管理と安全な決済処理を備えたフルスタックのEコマースプラットフォーム。",
    image: "https://via.placeholder.com/400x250",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "フルスタック",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example"
  },
  {
    id: 2,
    title: "タスク管理アプリ",
    description: "リアルタイム更新とチーム機能を持つコラボレーション型タスク管理アプリケーション。",
    image: "https://via.placeholder.com/400x250",
    technologies: ["React", "TypeScript", "Firebase", "TailwindCSS"],
    category: "フロントエンド",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example"
  },
  {
    id: 3,
    title: "AIチャットアプリケーション",
    description: "自然言語処理機能を備えたAI搭載チャットアプリケーション。",
    image: "https://via.placeholder.com/400x250",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    category: "AI/ML",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example"
  }
];

const categories = ["すべて", "フロントエンド", "フルスタック", "AI/ML"];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === "すべて" ? true : project.category === selectedCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        プロジェクト
      </motion.h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-8 space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200
              ${selectedCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                {hoveredProject === project.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4"
                  >
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        デモを見る
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Projects;