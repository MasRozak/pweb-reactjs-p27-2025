// src/components/protectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

<<<<<<< HEAD
  // TEMPORARY: Bypass auth for testing (remove when login is ready)
  // Set fake token in console: localStorage.setItem('token', 'test-token')
  const hasToken = localStorage.getItem('token');

  if (!isAuthenticated && !hasToken) {
    // return <Navigate to="/login" replace />; // Tendang ke /login

    // TEMPORARY: Show message instead of redirect
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Login page is not ready yet. For testing, open browser console and run:
          </p>
          <code className="block bg-gray-100 p-4 rounded text-sm text-left mb-6">
            localStorage.setItem('token', 'test-token')
          </code>
          <p className="text-sm text-gray-500 mb-4">
            Then refresh the page to access transaction pages.
          </p>
          <button
            onClick={() => {
              localStorage.setItem('token', 'test-token');
              window.location.reload();
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Set Test Token & Reload
          </button>
        </div>
      </div>
    );
  }

=======
  if (!isAuthenticated) {
    // Task: Redirect ke /login jika belum login
    // `replace` mengganti history agar user tidak bisa back ke halaman protected
    return <Navigate to="/login" replace />;
  }

  // Render halaman (child route) jika sudah terautentikasi
>>>>>>> 02d37d444068bc4dec022f061255949a62830006
  return <Outlet />;
};

export default ProtectedRoute;
