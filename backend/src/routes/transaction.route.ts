import { Router } from "express";
import {
    createTransactionController,
    bulkDeleteTransactionController,
    bulkUploadTransactionController,
    deleteTransactionController,
    duplicateTransactionController,
    getAllTransactionController,
    getTransactionByIdController,
    scanReceiptController,
    updateTransactionController
} from "../controllers/transaction.controller";

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransactionController);
transactionRoutes.get("/all", getAllTransactionController);
transactionRoutes.get("/:id", getTransactionByIdController);
transactionRoutes.put("/duplicate/:id", duplicateTransactionController);
transactionRoutes.put("/update/:id", updateTransactionController);
transactionRoutes.delete("/delete/:id", deleteTransactionController);
transactionRoutes.delete("/bulk-delete", bulkDeleteTransactionController);
transactionRoutes.post("/bulk-transaction", bulkUploadTransactionController);


export default transactionRoutes;