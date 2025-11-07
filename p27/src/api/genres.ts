// src/api/genres.ts
import axiosInstance from './axiosInstance';

interface Genre {
  id: string;
  name: string;
}

interface GenreDetail extends Genre {
  created_at?: string;
  updated_at?: string;
}

interface CreateGenreData {
  name: string;
}

interface UpdateGenreData {
  name: string;
}

interface GetGenresParams {
  page?: number;
  limit?: number;
  search?: string;
  orderByName?: 'asc' | 'desc';
}

interface GenresResponse {
  success: boolean;
  message: string;
  data: Genre[];
  meta?: {
    page: number;
    limit: number;
    prev_page: number | null;
    next_page: number | null;
  };
}

interface GenreResponse {
  success: boolean;
  message: string;
  data: GenreDetail;
}

interface GenreDeleteResponse {
  success: boolean;
  message: string;
}

/**
 * Create new genre
 * POST /genre
 */
export const createGenre = async (data: CreateGenreData): Promise<GenreResponse> => {
  const response = await axiosInstance.post('/genre', data);
  return response.data;
};

/**
 * Get all genres with pagination and filters
 * GET /genre
 */
export const getGenres = async (params?: GetGenresParams): Promise<GenresResponse> => {
  const response = await axiosInstance.get('/genre', { params });
  return response.data;
};

/**
 * Get genre by ID
 * GET /genre/:id
 */
export const getGenreById = async (id: string): Promise<GenreResponse> => {
  const response = await axiosInstance.get(`/genre/${id}`);
  return response.data;
};

/**
 * Update genre
 * PATCH /genre/:id
 */
export const updateGenre = async (id: string, data: UpdateGenreData): Promise<GenreResponse> => {
  const response = await axiosInstance.patch(`/genre/${id}`, data);
  return response.data;
};

/**
 * Delete genre (soft delete)
 * DELETE /genre/:id
 */
export const deleteGenre = async (id: string): Promise<GenreDeleteResponse> => {
  const response = await axiosInstance.delete(`/genre/${id}`);
  return response.data;
};
