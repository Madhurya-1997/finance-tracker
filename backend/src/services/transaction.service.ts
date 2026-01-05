import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model"
import { NotFoundException } from "../utils/app-error";
import { calculateNextOccurrence } from "../utils/helper";
import {
    CreateTransactionValidatorType,
    UpdateTransactionValidatorType
} from "../validators/transaction.validator";

export const createTransactionService = async (body: CreateTransactionValidatorType, userId: string) => {

    let nextRecurringDate: Date | undefined;
    const currentDate = new Date();

    if (body.isRecurring && body.recurringInterval) {
        const calculatedDate = calculateNextOccurrence(body.date, body.recurringInterval);

        if (currentDate > calculatedDate) {
            nextRecurringDate = calculateNextOccurrence(currentDate, body.recurringInterval);
        } else {
            nextRecurringDate = calculatedDate;
        }
    }

    const transaction = await TransactionModel.create({
        ...body,
        userId,
        amount: Number(body.amount),
        isRecurring: body.isRecurring || false,
        nextRecurringDate,
        recurringInterval: body.recurringInterval || undefined,
        lastProcessed: undefined
    });

    return transaction;
}

export const getAllTransactionService = async (
    userId: string,
    filters: {
        keyword?: string;
        type?: keyof typeof TransactionTypeEnum;
        recurringStatus?: "RECURRING" | "NON_RECURRING";
    },
    pagination: {
        pageSize: number;
        pageNumber: number;

    }
) => {
    const { keyword, type, recurringStatus } = filters;

    const { pageSize, pageNumber } = pagination;
    const skip = (pageNumber - 1) * pageSize;

    const filterConditions: Record<string, any> = {
        userId
    };

    if (keyword) {
        filterConditions.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } }
        ];
    }

    if (type) {
        filterConditions.type = type;
    }

    if (recurringStatus === "RECURRING") {
        filterConditions.isRecurring = true;
    } else if (recurringStatus === "NON_RECURRING") {
        filterConditions.isRecurring = false;
    }

    const [transactions, totalCount] = await Promise.all([
        TransactionModel
            .find(filterConditions)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 }),
        TransactionModel.countDocuments(filterConditions)
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);


    return {
        transactions,
        pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPages,
            skip
        }
    }
}

export const getTransactionByIdService = async (
    userId: string,
    transactionId: string
) => {
    const transaction = await TransactionModel.findOne({
        userId,
        _id: transactionId
    });

    if (!transaction) {
        throw new NotFoundException("Transaction not found");
    }

    return transaction;
}

export const duplicateTransactionService = async (
    userId: string,
    transactionId: string
) => {
    const transaction = await TransactionModel.findOne({
        userId,
        _id: transactionId
    });

    if (!transaction) {
        throw new NotFoundException("Transaction not found");
    }

    const duplicatedTransaction = await TransactionModel.create({
        ...transaction.toObject(),
        _id: undefined,
        title: `Duplicate - ${transaction.title}`,
        description: transaction.description ? `${transaction.description} - Duplicate` : `Duplicate transaction`,
        isRecurring: false,
        nextRecurringDate: undefined,
        recurringInterval: undefined,
        lastProcessed: undefined
    })

    return duplicatedTransaction;
}

export const updateTransactionService = async (
    userId: string,
    transactionId: string,
    body: UpdateTransactionValidatorType
) => {

    const existingTransaction = await TransactionModel.findOne(
        {
            userId,
            _id: transactionId
        },
    );

    if (!existingTransaction) {
        throw new NotFoundException("Transaction to be updated not found");
    }

    const currentDate = new Date();
    const isRecurring = body.isRecurring ? body.isRecurring : existingTransaction.isRecurring;

    const date = body.date ? new Date(body.date) : existingTransaction.date;

    const recurringInterval = body.recurringInterval ? body.recurringInterval : existingTransaction.recurringInterval;

    let nextRecurringDate: Date | undefined;

    if (isRecurring && recurringInterval) {
        const calculatedDate = calculateNextOccurrence(date, recurringInterval);

        if (currentDate > calculatedDate) {
            nextRecurringDate = calculateNextOccurrence(currentDate, recurringInterval);
        } else {
            nextRecurringDate = calculatedDate;
        }
    }


    existingTransaction.set({
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.amount && { amount: Number(body.amount) }),
        ...(body.type && { type: body.type }),
        ...(body.category && { category: body.category }),
        date,
        isRecurring,
        nextRecurringDate,
        recurringInterval
    });

    await existingTransaction.save();

    return;
}

export const deleteTransactionService = async (
    userId: string,
    transactionId: string
) => {
    const deletedTransaction = await TransactionModel.findByIdAndDelete({
        userId,
        _id: transactionId
    });

    if (!deletedTransaction) {
        throw new NotFoundException("Transaction not found");
    }

    return;
}