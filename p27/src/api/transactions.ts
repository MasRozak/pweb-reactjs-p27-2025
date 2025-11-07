// src/api/transactions.ts
import axiosInstance from './axiosInstance';
import {
  Transaction,
  CreateTransactionRequest,
  TransactionQueryParams
} from '../types/transaction.types';

export const getTransactions = async (params?: TransactionQueryParams) => {
  const response = await axiosInstance.get<{ data: Transaction[] }>('/transactions', { params });
  return response.data;
};

export const getTransactionById = async (id: number | string) => {
  const response = await axiosInstance.get<{ data: Transaction }>(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (data: CreateTransactionRequest) => {
  const response = await axiosInstance.post<{ data: Transaction }>('/transactions', data);
  return response.data;
};
