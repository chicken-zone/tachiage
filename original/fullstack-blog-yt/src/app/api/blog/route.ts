import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// PrismaClientのシングルトンインスタンスを作成
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function main() {
    try {
        await prisma.$connect();
        return true;
    } catch (error) {
        console.error("Database connection failed:", error);
        return false;
    }
}

// ブログの全記事取得用のAPI
export const GET = async () => {
    try {
        const isConnected = await main();
        if (!isConnected) {
            return NextResponse.json(
                { message: "データベース接続に失敗しました" },
                { status: 500 }
            );
        }

        const posts = await prisma.post.findMany();
        return NextResponse.json(
            { message: "success", posts },
            { status: 200 }
        );
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "ブログ記事の取得に失敗しました", error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
};