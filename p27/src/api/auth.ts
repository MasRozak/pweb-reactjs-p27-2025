// src/api/auth.ts
import axiosInstance from './axiosInstance';

interface RegisterData {
  username?: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    created_at: string;
  };
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
  };
}

interface MeResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
  };
}

/**
 * Register new user
 * POST /auth/register
 */
export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

/**
 * Login user
 * POST /auth/login
 */
export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

/**
 * Get current user (me)
 * GET /auth/me
 */
export const getCurrentUser = async (): Promise<MeResponse> => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};
