import { z } from 'zod';
import {
    RecurringIntervalEnum,
    TransactionTypeEnum
} from '../models/transaction.model';


const transactionIdValidatorSchema = z.string().trim().min(1);

const baseTransactionValidatorSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    amount: z.number().positive("Amount must be positive"),
    type: z.enum([TransactionTypeEnum.INCOME, TransactionTypeEnum.EXPENSE], {
        error: "Transaction type must be INCOME or EXPENSE"
    }),
    category: z.string().min(1, "Category is required"),
    date: z
        .union([z.string().datetime({ message: "Invalid date string" }), z.date()])
        .transform((val) => new Date(val)),
    isRecurring: z.boolean().default(false),
    recurringInterval: z
        .enum([
            RecurringIntervalEnum.DAILY,
            RecurringIntervalEnum.WEEKLY,
            RecurringIntervalEnum.MONTHLY,
            RecurringIntervalEnum.YEARLY,
        ])
        .nullable()
        .optional(),
    receiptUrl: z.string().optional()
});

export const createTransactionValidatorSchema = baseTransactionValidatorSchema;
export const updateTransactionSchema = baseTransactionValidatorSchema.partial();

export type CreateTransactionValidatorType = z.infer<typeof createTransactionValidatorSchema>;
export type UpdateTransactionValidatorType = z.infer<typeof updateTransactionSchema>;