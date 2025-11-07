// src/api/index.ts
// Export all API functions from a single entry point

// Auth APIs
export {
  register,
  login,
  getCurrentUser
} from './auth';

// Books APIs
export {
  createBook,
  getBooks,
  getBooksByGenre,
  getBookById,
  updateBook,
  deleteBook
} from './books';

// Genres APIs
export {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre
} from './genres';

// Transactions APIs
export {
  createTransaction,
  getTransactions,
  getTransactionById,
  getTransactionStatistics
} from './transactions';

// Health Check API
export { healthCheck } from './healthCheck';

// Axios instance
export { default as axiosInstance } from './axiosInstance';
