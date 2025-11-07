// src/api/books.ts
import axiosInstance from './axiosInstance';
import { Book, Genre, BookQueryParams } from '../types/book.types';

export const getBooks = async (params?: BookQueryParams) => {
  const response = await axiosInstance.get<{ data: Book[] }>('/books', { params });
  return response.data;
};

export const getBookById = async (id: number | string) => {
  const response = await axiosInstance.get<{ data: Book }>(`/books/${id}`);
  return response.data;
};

export const createBook = async (data: Partial<Book>) => {
  const response = await axiosInstance.post<{ data: Book }>('/books', data);
  return response.data;
};

export const deleteBook = async (id: number | string) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await axiosInstance.get<{ data: Genre[] }>('/genres');
  return response.data;
};
