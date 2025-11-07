// src/api/healthCheck.ts
import axiosInstance from './axiosInstance';

interface HealthCheckResponse {
  success: boolean;
  message: string;
  date: string;
}

/**
 * Health check endpoint
 * GET /health-check
 */
export const healthCheck = async (): Promise<HealthCheckResponse> => {
  const response = await axiosInstance.get('/health-check');
  return response.data;
};
