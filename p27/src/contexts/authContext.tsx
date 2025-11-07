import { createContext, useContext, useState } from 'react';
import { getToken, removeToken } from '../utils/token';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  // Tambahkan fungsi login/logout di sini nanti
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [userEmail, setUserEmail] = useState<string | null>(null); // Nanti diisi saat login

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUserEmail(null);
    // Arahkan ke /login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, logout }}>
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