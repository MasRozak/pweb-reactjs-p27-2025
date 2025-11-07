// src/components/protectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Task: Redirect ke /login jika belum login
    // `replace` mengganti history agar user tidak bisa back ke halaman protected
    return <Navigate to="/login" replace />;
  }

  // Render halaman (child route) jika sudah terautentikasi
  return <Outlet />;
};

export default ProtectedRoute;
