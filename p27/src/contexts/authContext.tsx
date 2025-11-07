// src/contexts/authContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, saveAuthData, removeAuthData } from '../utils/token.ts';
import api from '../utils/api'; // <-- IMPORT API HELPER KITA

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // State untuk loading awal
  const navigate = useNavigate();

  // useEffect BARU yang memverifikasi token
  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      if (token) {
        try {
          // Panggil /auth/me menggunakan token yang ada
          const response = await api.get('/auth/me');
          
          // 'response.data.data' berisi { id, username, email }
          const user = response.data.data; 

          // Sukses! Simpan data user
          setIsAuthenticated(true);
          setUserEmail(user.email);
          
          // Pastikan data di localStorage sinkron
          saveAuthData(token, user.email); 

        } catch (error) {
          // Token gagal (expired atau tidak valid)
          removeAuthData();
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      }
      setLoading(false); // Selesai loading
    };

    verifyToken();
  }, []);

  const login = (token: string, email: string) => {
    saveAuthData(token, email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    removeAuthData();
    setIsAuthenticated(false);
    setUserEmail(null);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    userEmail,
    login,
    logout,
  };

  // Tampilkan loading screen jika verifikasi belum selesai
  if (loading) {
    return <div>Loading...</div>; // Atau komponen Loader-mu
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
