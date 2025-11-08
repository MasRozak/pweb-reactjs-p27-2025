// src/api/transactions.ts
import axiosInstance from './axiosInstance';
import type { Transaction, CreateTransactionRequest } from '../types/transaction.types';

// API Response interfaces
interface TransactionsResponse {
  success: boolean;
  message: string;
  data: Transaction[];
  meta?: {
    page: number;
    limit: number;
    prev_page: number | null;
    next_page: number | null;
  };
}

interface TransactionResponse {
  success: boolean;
  message: string;
  data: Transaction;
}

interface CreateTransactionResponse {
  success: boolean;
  message: string;
  data: {
    transaction_id: string;
    total_quantity: number;
    total_price: number;
  };
}

interface TransactionStatistics {
  total_transactions: number;
  average_transaction_amount: number;
  fewest_book_sales_genre: string;
  most_book_sales_genre: string;
}

interface TransactionStatisticsResponse {
  success: boolean;
  message: string;
  data: TransactionStatistics;
}

interface GetTransactionsParams {
  page?: number;
  limit?: number;
  search?: string; // search by transaction ID
  sortBy?: 'id' | 'total_amount' | 'total_price';
  order?: 'asc' | 'desc';
}

/**
 * Create new transaction
 * POST /transactions
 */
export const createTransaction = async (
  data: CreateTransactionRequest & { user_id: string }
): Promise<CreateTransactionResponse> => {
  const response = await axiosInstance.post('/transactions', data);
  return response.data;
};

/**
 * Get all transactions with pagination and filters
 * GET /transactions
 */
export const getTransactions = async (params?: GetTransactionsParams): Promise<TransactionsResponse> => {
  const response = await axiosInstance.get('/transactions', { params });
  return response.data;
};

/**
 * Get transaction by ID
 * GET /transactions/:id
 */
export const getTransactionById = async (id: string): Promise<TransactionResponse> => {
  const response = await axiosInstance.get(`/transactions/${id}`);
  return response.data;
};

/**
 * Get transaction statistics
 * GET /transactions/statistics
 */
export const getTransactionStatistics = async (): Promise<TransactionStatisticsResponse> => {
  const response = await axiosInstance.get('/transactions/statistics');
  return response.data;
};
