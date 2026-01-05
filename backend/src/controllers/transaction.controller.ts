import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { HTTPSTATUS } from '../config/http.config';
import {
    createTransactionService,
    getAllTransactionService,
    getTransactionByIdService,
    duplicateTransactionService,
    updateTransactionService,
    deleteTransactionService
} from '../services/transaction.service';
import { createTransactionValidatorSchema, updateTransactionSchema } from '../validators/transaction.validator';
import { UserDocument } from '../models/user.model';
import { UnauthorizedException } from '../utils/app-error';
import { TransactionTypeEnum } from '../models/transaction.model';
import logger, { LOGGER_SYMBOLS } from '../utils/logger';

declare global {
    namespace Express {
        interface User extends UserDocument {
            _id?: string;
        }
    }
}

export const createTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside createTransactionController controller`)

    const body = createTransactionValidatorSchema.parse(req.body);

    const userId = req.user?._id;

    if (!userId) {
        throw new UnauthorizedException("User not found");
    }

    const transaction = await createTransactionService(body, userId);
    return res
        .status(HTTPSTATUS.CREATED)
        .json({
            message: "Transaction created successfully",
            data: transaction
        });
});

export const getAllTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside getAllTransactionController controller`)

    const userId = req.user?._id;

    if (!userId) {
        throw new UnauthorizedException("User not found");
    }

    const filters = {
        keyword: req.query.keyword as string,
        type: req.query.type as TransactionTypeEnum | undefined,
        recurringStatus: req.query.recurringStatus as "RECURRING" | "NON_RECURRING" | undefined
    }

    const pagination = {
        pageSize: Number(req.query.pageSize) || 10,
        pageNumber: Number(req.query.pageNumber) || 1
    }

    const {
        transactions,
        pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPages,
            skip
        }
    } = await getAllTransactionService(userId, filters, pagination);


    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "Transactions fetched successfully",
            data: {
                transactions,
                pagination: {
                    pageSize,
                    pageNumber,
                    totalCount,
                    totalPages,
                    skip
                }
            }
        });
});

export const getTransactionByIdController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside getTransactionByIdController controller`)

    const userId = req.user?._id;

    if (!userId) {
        throw new UnauthorizedException("User not found");
    }

    const transaction = await getTransactionByIdService(userId, req.params.id);

    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "Transaction fetched successfully",
            data: transaction
        });
});

export const duplicateTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside duplicateTransactionController controller`)

    const userId = req.user?._id;

    if (!userId) {
        throw new UnauthorizedException("User not found");
    }

    const duplicatedTransaction = await duplicateTransactionService(userId, req.params.id);

    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "Transaction duplicated successfully",
            data: duplicatedTransaction
        });
});

export const updateTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside updateTransactionController controller`)

    const userId = req.user?._id;

    if (!userId) {
        throw new UnauthorizedException("User not found");
    }

    const body = updateTransactionSchema.parse(req.body);

    await updateTransactionService(userId, req.params.id, body);

    return res
        .status(HTTPSTATUS.NO_CONTENT)
        .json({
            message: "Transaction updated successfully",
            data: {}
        });
});

export const deleteTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside deleteTransactionController controller`)

    const userId = req.user?._id;
    if (!userId) {
        throw new UnauthorizedException("User not found");
    }

    await deleteTransactionService(userId, req.params.id);

    return res
        .status(HTTPSTATUS.NO_CONTENT)
        .json({
            message: "Transaction deleted successfully",
            data: {}
        });
});

export const bulkDeleteTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside bulkDeleteTransactionController controller`)

    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "Transactions deleted in bulk successfully",
            data: {}
        });
});

export const bulkUploadTransactionController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside bulkUploadTransactionController controller`)

    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "Transactions uploaded in bulk successfully",
            data: {}
        });
});

export const scanReceiptController = asyncHandler(async (req: Request, res: Response) => {
    logger.info(`${LOGGER_SYMBOLS.INFO} - Inside scanReceiptController controller`)

    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "Transaction receipt scanned successfully",
            data: {}
        });
});
