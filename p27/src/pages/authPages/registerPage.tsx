// src/pages/authPages/registerPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Input from "../../components/Input.tsx";
import Button from "../../components/Button.tsx";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import styles from "./RegisterPage.module.css";

interface ApiErrorResponse {
  message: string;
}

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/auth/register";

  const validateForm = (): boolean => {
    let isValid = true;
    const errors = { email: "", password: "", confirmPassword: "" };

    // Email validation
    if (!email) {
      errors.email = "Email tidak boleh kosong";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Format email tidak valid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      errors.password = "Password tidak boleh kosong";
      isValid = false;
    } else if (password.length < 6) {
      // Contoh validasi tambahan
      errors.password = "Password minimal 6 karakter";
      isValid = false;
    }

    // Task: Validasi client-side (password match)
    if (!confirmPassword) {
      errors.confirmPassword = "Konfirmasi password tidak boleh kosong";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password tidak cocok";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Task: Kirim POST ke /auth/register
      await axios.post(API_URL, { email, password });

      // Task: Redirect ke /login setelah berhasil register
      navigate("/login");
    } catch (err) {
      // Task: Tampilkan error message jika gagal
      let message = "Registrasi gagal. Coba lagi nanti.";
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ApiErrorResponse>;
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          message = error.response.data.message;
        }
      }
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {apiError && <ErrorMessage message={apiError} />}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={formErrors.email}
            disabled={loading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
            disabled={loading}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={formErrors.confirmPassword}
            disabled={loading}
          />
          <Button type="submit" loading={loading} className="w-full">
            Register
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
