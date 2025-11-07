// src/pages/authPages/LoginPage.tsx

// 1. IMPORT YANG SUDAH DIPERBAIKI (termasuk 'type FormEvent' dan 'type ChangeEvent')
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import axios, { type AxiosError } from 'axios';


import styles from './LoginPage.module.css';

// Tipe untuk response error dari API
interface ApiErrorResponse {
  message: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();
  const auth = useAuth();
  const API_URL = 'http://localhost:8080/auth/login';

  // 2. FUNGSI VALIDATEFORM YANG SUDAH DIPERBAIKI (Error di L24, L25, L26)
  const validateForm = (): boolean => {
    let isValid = true; // <-- Memperbaiki error 'Cannot find name isValid'
    const errors = { email: '', password: '' }; // <-- Memperbaiki error 'Cannot find name errors'

    if (!email) {
      errors.email = 'Email tidak boleh kosong';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format email tidak valid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password tidak boleh kosong';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid; // <-- Memperbaiki error 'must return a value'
  };

  // 3. FUNGSI HANDLESUBMIT DENGAN TIPE YANG BENAR (Error di L29)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_URL, { email, password });

      // INI BAGIAN YANG BERUBAH
      // Ambil 'access_token' dari balasan backend
      // (Asumsi ResponseFormatter membungkusnya di 'data')
      const { access_token } = response.data.data; 
      
      // Panggil fungsi login dengan token DAN email dari state
      auth.login(access_token, email);
      
      navigate('/books');

    } catch (err) {
      let message = 'Login gagal. Periksa kembali email dan password Anda.';
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ApiErrorResponse>;
        if (error.response && error.response.data && error.response.data.message) {
          // Backend-mu mengirim error di 'message'
          message = error.response.data.message;
        }
      }
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  // 4. JSX DENGAN STYLE CSS MODULES DAN TIPE EVENT YANG BENAR (Error di L48, L66)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        
        {apiError && (
          <div className={styles.apiError}> {/* Buat style untuk .apiError di CSS-mu */}
            {apiError}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              disabled={loading}
              className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
            />
            {formErrors.email && (
              <p className={styles.errorText}>{formErrors.email}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              disabled={loading}
              className={`${styles.input} ${formErrors.password ? styles.inputError : ''}`}
            />
            {formErrors.password && (
              <p className={styles.errorText}>{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
        
        <p className={styles.linkText}>
          Belum punya akun?{' '}
          <Link to="/register" className={styles.link}>
            Register di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
