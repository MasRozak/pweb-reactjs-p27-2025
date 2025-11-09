// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- WAJIB ADA
import { AuthProvider } from './contexts/authContext'; // <-- WAJIB ADA
import { CartProvider } from './contexts/cartContext'; // <-- CART PROVIDER
import App from './App';
import './index.css'; // File CSS globalmu

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 1. BUNGKUS DENGAN BROWSERROUTER */}
    <BrowserRouter>
      {/* 2. BUNGKUS DENGAN AUTHPROVIDER */}
      <AuthProvider>
        {/* 3. BUNGKUS DENGAN CARTPROVIDER */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
