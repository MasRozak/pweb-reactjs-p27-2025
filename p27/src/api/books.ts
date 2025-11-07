// src/api/books.ts
import axiosInstance from './axiosInstance';

interface Book {
  id: string;
  title: string;
  writer: string;
  publisher: string;
  description?: string;
  publication_year?: number;
  price: number;
  stock_quantity: number;
  genre: string;
}

interface BookDetail extends Book {
  isbn?: string;
  condition?: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'POOR';
}

interface CreateBookData {
  title: string;
  writer: string;
  publisher: string;
  description?: string;
  publication_year?: number;
  price: number;
  stock_quantity: number;
  genre_id: string;
  isbn?: string;
  condition?: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'POOR';
}

interface UpdateBookData {
  description?: string;
  price?: number;
  stock_quantity?: number;
}

interface GetBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  orderByTitle?: 'asc' | 'desc';
  orderByPublishDate?: 'asc' | 'desc';
  condition?: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'POOR';
}

interface BooksResponse {
  success: boolean;
  message: string;
  data: Book[];
  meta?: {
    page: number;
    limit: number;
    prev_page: number | null;
    next_page: number | null;
  };
}

interface BookResponse {
  success: boolean;
  message: string;
  data: BookDetail;
}

interface BookDeleteResponse {
  success: boolean;
  message: string;
}

interface BookCreateResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    created_at: string;
  };
}

/**
 * Add new book
 * POST /books
 */
export const createBook = async (data: CreateBookData): Promise<BookCreateResponse> => {
  const response = await axiosInstance.post('/books', data);
  return response.data;
};

/**
 * Get all books with pagination and filters
 * GET /books
 */
export const getBooks = async (params?: GetBooksParams): Promise<BooksResponse> => {
  const response = await axiosInstance.get('/books', { params });
  return response.data;
};

/**
 * Get books by genre with pagination and filters
 * GET /books/genre/:id
 */
export const getBooksByGenre = async (
  genreId: string,
  params?: GetBooksParams
): Promise<BooksResponse> => {
  const response = await axiosInstance.get(`/books/genre/${genreId}`, { params });
  return response.data;
};

/**
 * Get book by ID
 * GET /books/:id
 */
export const getBookById = async (id: string): Promise<BookResponse> => {
  const response = await axiosInstance.get(`/books/${id}`);
  return response.data;
};

/**
 * Update book (description, price, stock_quantity only)
 * PATCH /books/:id
 */
export const updateBook = async (id: string, data: UpdateBookData): Promise<BookResponse> => {
  const response = await axiosInstance.patch(`/books/${id}`, data);
  return response.data;
};

/**
 * Delete book (soft delete)
 * DELETE /books/:id
 */
export const deleteBook = async (id: string): Promise<BookDeleteResponse> => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};
