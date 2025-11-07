// src/types/transaction.types.ts

export interface TransactionItem {
  book_id: number;
  book_title?: string; // from response detail
  quantity: number;
  price: number;
  subtotal?: number;
}

export interface Transaction {
  id: number;
  user_id: number;
  user_email?: string;
  total_amount: number;
  total_price: number;
  created_at: string;
  items?: TransactionItem[]; // for detail
}

export interface CreateTransactionRequest {
  items: {
    book_id: number;
    quantity: number;
  }[];
}

export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'id' | 'total_amount' | 'total_price';
  order?: 'asc' | 'desc';
}
