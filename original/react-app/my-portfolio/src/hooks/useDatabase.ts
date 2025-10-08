import { useState, useEffect } from 'react';
import { skillService, experienceService } from '../lib/database';

export interface Skill {
  id: number;
  name: string;
  years: number;
  maxYears: number;
  category: string;
}

export interface Experience {
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

// スキル管理用のカスタムフック
export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // スキル取得
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await skillService.getAllSkills();
      setSkills(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // スキル追加
  const addSkill = async (skillData: Omit<Skill, 'id'>) => {
    try {
      await skillService.createSkill(skillData);
      await fetchSkills(); // 再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // スキル更新
  const updateSkill = async (id: number, skillData: Partial<Skill>) => {
    try {
      await skillService.updateSkill(id, skillData);
      await fetchSkills(); // 再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // スキル削除
  const deleteSkill = async (id: number) => {
    try {
      await skillService.deleteSkill(id);
      await fetchSkills(); // 再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch: fetchSkills
  };
};

// 職歴管理用のカスタムフック
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 職歴取得
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAllExperiences();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 職歴追加
  const addExperience = async (experienceData: Omit<Experience, 'id'>) => {
    try {
      await experienceService.createExperience(experienceData);
      await fetchExperiences(); // 再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // 職歴更新
  const updateExperience = async (id: number, experienceData: Partial<Experience>) => {
    try {
      await experienceService.updateExperience(id, experienceData);
      await fetchExperiences(); // 再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // 職歴削除
  const deleteExperience = async (id: number) => {
    try {
      await experienceService.deleteExperience(id);
      await fetchExperiences(); // 再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    addExperience,
    updateExperience,
    deleteExperience,
    refetch: fetchExperiences
  };
};