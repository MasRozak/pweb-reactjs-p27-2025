// src/api/transactions.ts
import axiosInstance from './axiosInstance';

interface TransactionItem {
  book_id: string;
  quantity: number;
}

interface TransactionItemDetail extends TransactionItem {
  book_title?: string;
  subtotal_price?: number;
}

interface Transaction {
  id: string;
  total_quantity: number;
  total_price: number;
}

interface TransactionDetail extends Transaction {
  items: TransactionItemDetail[];
}

interface CreateTransactionData {
  user_id: string;
  items: TransactionItem[];
}

interface GetTransactionsParams {
  page?: number;
  limit?: number;
  search?: string; // search by transaction ID
  orderById?: 'asc' | 'desc';
  orderByAmount?: 'asc' | 'desc';
  orderByPrice?: 'asc' | 'desc';
}

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
  data: TransactionDetail;
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

/**
 * Create new transaction
 * POST /transactions
 */
export const createTransaction = async (
  data: CreateTransactionData
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
