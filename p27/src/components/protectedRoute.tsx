import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Ambil dari context

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Tendang ke /login
  }

  return <Outlet />; 
};

export default ProtectedRoute;