import { PrismaClient } from '@prisma/client'

// 既存のSQLite DB
const sqlitePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
})

// 新しいPostgreSQL DB（環境変数で切り替え）
const postgresPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_DATABASE_URL
    }
  }
})

async function migrateData() {
  console.log('🔄 データ移行を開始します...')

  try {
    // 既存データを取得
    const [skills, experiences] = await Promise.all([
      sqlitePrisma.skill.findMany(),
      sqlitePrisma.experience.findMany()
    ])

    console.log(`📊 移行対象: スキル ${skills.length}件、職歴 ${experiences.length}件`)

    // 新しいDBにデータを投入
    console.log('📥 スキルデータを移行中...')
    for (const skill of skills) {
      const { id, createdAt, updatedAt, ...skillData } = skill
      await postgresPrisma.skill.create({
        data: skillData
      })
    }

    console.log('📥 職歴データを移行中...')
    for (const experience of experiences) {
      const { id, createdAt, updatedAt, ...experienceData } = experience
      await postgresPrisma.experience.create({
        data: experienceData
      })
    }

    console.log('✅ データ移行が完了しました！')

    // 移行確認
    const [newSkillCount, newExperienceCount] = await Promise.all([
      postgresPrisma.skill.count(),
      postgresPrisma.experience.count()
    ])

    console.log(`✨ 移行結果: スキル ${newSkillCount}件、職歴 ${newExperienceCount}件`)

  } catch (error) {
    console.error('❌ 移行エラー:', error)
  } finally {
    await sqlitePrisma.$disconnect()
    await postgresPrisma.$disconnect()
  }
}

// 実行
if (require.main === module) {
  migrateData()
}

export { migrateData }