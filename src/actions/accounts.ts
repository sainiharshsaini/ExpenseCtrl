"use server";

import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { serializeTxn } from "@/lib/serializers";
import { revalidatePath } from "next/cache";

export async function getAccountWithTransactions(accountId: any) {
    const user = await getAuthenticatedUser();

    const account = await db.account.findUnique({
        where: { id: accountId, userId: user.id },
        include: {
            transactions: {
                orderBy: { date: "desc" },
            },
            _count: {
                select: { transactions: true },
            },
        },
    });

    if (!account) return null;

    return {
        ...serializeTxn(account),
        transactions: account.transactions.map(serializeTxn),
    };
}

export async function updateDefaultAccount(accountId: any) {
    try {
        const user = await getAuthenticatedUser();

        // First, unset any existing default account
        await db.account.updateMany({
            where: { userId: user.id, isDefault: true },
            data: { isDefault: false },
        });

        // Then set the new default account
        const account = await db.account.update({
            where: {
                id: accountId,
                userId: user.id,
            },
            data: { isDefault: true },
        });

        revalidatePath("/dashboard");
        return { success: true, data: serializeTxn(account) };
    } catch (error) {
        if (error instanceof Error) {
            console.error("An error occurred:", error.message)
            return { success: false, error: error.message }
        } else {
            console.error("An unknown error occured:", error)
            return { success: false, error: error }
        }
    }
}

export async function bulkDeleteTransactions(transactionIds: any) {
    try {
        const user = await getAuthenticatedUser()

        // Get transactions to calculate balance changes
        const transactions = await db.transaction.findMany({
            where: {
                id: { in: transactionIds },
                userId: user.id,
            },
        });

        // Group transactions by account to update total balances
        const accountBalanceChanges = transactions.reduce((acc, transaction) => {
            const change = transaction.type === "EXPENSE" ? transaction.amount : -transaction.amount;
            acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
            return acc;
        }, {});

        // Delete transactions and update account balances in a transaction
        await db.$transaction(async (tx) => {
            // Delete transactions
            await tx.transaction.deleteMany({
                where: {
                    id: { in: transactionIds },
                    userId: user.id,
                },
            });

            // Update account balances
            for (const [accountId, balanceChange] of Object.entries(accountBalanceChanges)) {
                await tx.account.update({
                    where: { id: accountId },
                    data: {
                        balance: {
                            increment: balanceChange,
                        },
                    },
                });
            }
        });

        revalidatePath("/dashboard");
        revalidatePath("/account/[id]");

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}