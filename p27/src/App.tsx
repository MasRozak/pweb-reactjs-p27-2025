// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import ProtectedRoute from './components/protectedRoute';

// Import halaman-halaman
import LoginPage from './pages/authPages/loginPage';
import RegisterPage from './pages/authPages/registerPage';

// Halaman-halaman ini akan dibuat oleh tim lain, 
// tapi kita buat placeholder-nya
const BooksList = () => <div>Halaman Daftar Buku (Protected)</div>;
const BookDetail = () => <div>Halaman Detail Buku (Protected)</div>;
const AddBook = () => <div>Halaman Tambah Buku (Protected)</div>;
const TransactionsList = () => <div>Halaman Transaksi (Protected)</div>;
const TransactionDetail = () => <div>Halaman Detail Transaksi (Protected)</div>;

const App = () => {
  return (
    <div className="app-container">
      {/* Navbar akan tampil di semua halaman */}
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto p-4">
        <Routes>
          {/* Rute Publik */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rute Terproteksi */}
          {/* Task: pastikan semua rute protected menggunakan component ini */}
          <Route element={<ProtectedRoute />}>
            <Route path="/books" element={<BooksList />} />
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/transactions" element={<TransactionsList />} />
            <Route path="/transactions/:id" element={<TransactionDetail />} />
          </Route>

          {/* Redirect halaman root (/) ke /books jika sudah login, atau /login jika belum */}
          <Route 
            path="/" 
            element={<Navigate to="/books" replace />} 
          />

          {/* Halaman 404 (Opsional tapi bagus) */}
          <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
