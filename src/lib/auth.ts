import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

interface DbUser {
    id: string;
    clerkUserId: string;
    email: string;
    name?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function getAuthenticatedUser(): Promise<DbUser> {
    const { userId } = await auth();

    if (!userId) {
        console.error("Authentication Error: No userId found from Clerk.");
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        console.error(`Authentication Error: User with clerkUserId ${userId} not found in database.`);
        throw new Error("User not found");
    }

    return user as DbUser;
}