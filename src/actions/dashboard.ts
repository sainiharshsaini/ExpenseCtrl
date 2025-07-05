"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { serializeTxn } from "@/lib/serializers";
import { getAuthenticatedUser } from "@/lib/auth";

export async function createAccount(data: any) {
    try {
        const user = await getAuthenticatedUser(); // Call the common utility function to get the authenticated user.

        const balanceFloat = parseFloat(data.balance); // Convert balance into float before saving and check if the balance is number or not
        if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

        const existingAccounts = await db.account.findMany({ // checking how many existing accounts user have
            where: { userId: user.id }
        })

        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault; // if user has only one existing account then make it default account

        if (shouldBeDefault) { // if it has only single account then i making it default by default but not sending it from data
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

        const serializedAccount = serializeTxn(account); // nextjs doesn't support the decimal value so, before sending it to nextjs we need to serialize its value

        revalidatePath("/dashboard"); // it will basically help to re-fetch the value of the page
        return { success: true, data: serializedAccount };

    } catch (error) {
        if (error instanceof Error) {
            console.error("An error occurred:", error.message)
        } else {
            console.error("An unknown error occured:", error)
        }
    }
}

export async function getUserAccounts() {
    const user = await getAuthenticatedUser();

    try {
        const userBankAccounts = await db.account.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: {
                        transactions: true,
                    },
                },
            },
        });

        const serializedUserBankAccounts = userBankAccounts.map(serializeTxn);

        return serializedUserBankAccounts;

    } catch (error) {
        if (error instanceof Error) {
            console.error("An error occurred:", error.message)
        } else {
            console.error("An unknown error occured:", error)
        }
    }
}

export async function getDashboardData() {

}