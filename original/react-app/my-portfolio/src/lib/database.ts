import { prisma } from './prisma';

// スキル関連のサービス
export const skillService = {
  // 全てのスキルを取得
  async getAllSkills() {
    try {
      console.log('Fetching skills from database...');
      const skills = await prisma.skill.findMany({
        orderBy: [
          { category: 'asc' },
          { name: 'asc' }
        ]
      });
      console.log('Skills fetched successfully:', skills);
      return skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  // カテゴリ別にスキルを取得
  async getSkillsByCategory(category?: string) {
    const where = category ? { category } : {};
    return await prisma.skill.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });
  },

  // スキルを追加
  async createSkill(data: {
    name: string;
    years: number;
    maxYears: number;
    category: string;
  }) {
    return await prisma.skill.create({
      data
    });
  },

  // スキルを更新
  async updateSkill(id: number, data: Partial<{
    name: string;
    years: number;
    maxYears: number;
    category: string;
  }>) {
    return await prisma.skill.update({
      where: { id },
      data
    });
  },

  // スキルを削除
  async deleteSkill(id: number) {
    return await prisma.skill.delete({
      where: { id }
    });
  }
};

// 職歴関連のサービス
export const experienceService = {
  // 全ての職歴を取得（ソート順）
  async getAllExperiences() {
    return await prisma.experience.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    });
  },

  // IDで職歴を取得
  async getExperienceById(id: number) {
    return await prisma.experience.findUnique({
      where: { id }
    });
  },

  // 職歴を追加
  async createExperience(data: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string | null;
    employmentType: string;
    businessType: string;
    description: string;
    responsibilities?: string | null;
    achievements?: string | null;
    technologies?: string | null;
    isCurrentJob?: boolean;
    sortOrder?: number;
  }) {
    return await prisma.experience.create({
      data
    });
  },

  // 職歴を更新
  async updateExperience(id: number, data: Partial<{
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
  }>) {
    return await prisma.experience.update({
      where: { id },
      data
    });
  },

  // 職歴を削除
  async deleteExperience(id: number) {
    return await prisma.experience.delete({
      where: { id }
    });
  }
};