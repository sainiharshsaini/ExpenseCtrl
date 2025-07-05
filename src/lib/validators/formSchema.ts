import { z } from "zod";

export const bankAccountSchema = z.object({
  name: z.string().min(1, 'Account name is required').max(100, 'Account name cannot exceed 100 characters'),
  type: z.enum(['CURRENT', 'SAVINGS'], {
    errorMap: () => ({ message: 'Please select an account type' }),
  }),
  balance: z.preprocess(
    (val) => Number(val),
    z.number()
      .min(0, 'Amount cannot be negative')
      .max(1000000, 'Amount cannot exceed 1,000,000')
      .refine(val => !isNaN(val), { message: 'Amount must be a number' })
  ),
  isDefault: z.boolean().default(false),
});

export type BankAccountInputs = z.infer<typeof bankAccountSchema>;

// export const transactionSchema = z.object({
//     type: z.enum(["INCOME", "EXPENSE"]),
//     amount: z.string().min(1, "Amount is required"),
//     description: z.string().optional(),
//     date: z.date({ required_error: "Date is required" }),
//     accountId: z.string().min(1, "Account is required"),
//     category: z.string().min(1, "Category is required"),
//     isRecurring: z.boolean().default(false),
//     recurringInterval: z
//       .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
//       .optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.isRecurring && !data.recurringInterval) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Recurring interval is required for recurring transactions",
//         path: ["recurringInterval"],
//       });
//     }
//   });