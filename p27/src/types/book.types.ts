// src/types/book.types.ts

export interface Book {
  id: number;
  title: string;
  writer: string;
  publisher: string;
  price: number;
  stock: number;
  genre: string;
  isbn?: string;
  description?: string;
  publication_year?: number;
  condition?: 'New' | 'Good' | 'Fair' | 'Poor';
  book_image?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface BookQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  condition?: string;
  sortBy?: 'title' | 'publication_year';
  order?: 'asc' | 'desc';
}
