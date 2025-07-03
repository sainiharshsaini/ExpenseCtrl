"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTxn = (obj: any) => {
    const serialized = { ...obj };

    if (obj.balance) serialized.balance = obj.balance.toNumber();
}

export async function createAccount(data: any) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });
        if (!user) throw new Error("User not found");

        // Convert balance into float before saving and check if the balance is number or not
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

        // checking how many existing accounts user have
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id }
        })

        // if user has only one existing account then make it default account
        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

        // if it has only single account then i making it default by default but not sending it from data
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false }
            })
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault
            }
        })

        // nextjs doesn't support the decimal value so, before sending it to nextjs we need to serialize its value
        const serializedAccount = serializeTxn(account);

        // it will basically help to re-fetch the value of the page
        revalidatePath("/dashboard");
        return { success: true, data: serializedAccount };

    } catch (error) {
        if (error instanceof Error) {
            console.error("An error occurred:", error.message)
        } else {
            console.error("An unknown error occured:", error)
        }
    }
}