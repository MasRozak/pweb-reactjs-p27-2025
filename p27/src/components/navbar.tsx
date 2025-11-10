// src/components/navbar.tsx
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useCart } from '../contexts/cartContext';

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Style untuk NavLink (dibuat lebih modern & subtle) ---
  const activeClassName = "text-blue-700 font-semibold";
  const defaultClassName = "text-gray-600 hover:text-blue-700";

  const renderNavLinks = (isMobile = false) => (
    <>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            `block py-2 px-3 rounded ${isActive ? activeClassName : defaultClassName}`
          }
          // Tambahan: tutup menu mobile saat link diklik
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `block py-2 px-3 rounded ${isActive ? activeClassName : defaultClassName}`
          }
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          My Transactions
        </NavLink>
      </li>
    </>
  );

  return (
    // Navigasi dibuat 'sticky' di atas dan diberi shadow/border halus
    <nav className="bg-white border-b border-gray-200 shadow-sm px-4 py-2.5 sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        
        {/* 1. Logo (Tetap sama) */}
        <Link to={isAuthenticated ? "/books" : "/"} className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            ITLiteratureShop
          </span>
        </Link>

        {/* --- STRUKTUR BARU UNTUK MEMPERBAIKI LAYOUT DESKTOP --- */}

        {/* 2. Tombol Hamburger (Mobile) */}
        {/* Hanya tampil jika sudah login */}
        {isAuthenticated && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        )}

        {/* 3. Kontainer untuk Navigasi Desktop & Info User */}
        {/* Ini adalah perbaikan utama: menggabungkan link dan info user dalam satu div */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4">

            {/* Nav Links */}
            <ul className="flex flex-row space-x-1 font-medium">
              {renderNavLinks(false)} {/* 'false' berarti ini untuk desktop */}
            </ul>

            {/* Cart Icon with Badge */}
            <Link
              to="/transactions/add"
              className="relative p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
              title="Shopping Cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Info User & Logout (dengan pemisah) */}
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-300">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        
        {/* --- AKHIR STRUKTUR BARU --- */}


        {/* 4. Menu Dropdown (Mobile) */}
        {/* Logikanya tetap sama, hanya style diperbarui sedikit */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="w-full md:hidden" id="mobile-menu">
            <ul className="flex flex-col mt-4 pt-4 border-t border-gray-200">
              {renderNavLinks(true)} {/* 'true' berarti ini untuk mobile */}

              {/* Cart Link (Mobile) */}
              <li>
                <Link
                  to="/transactions/add"
                  className="flex items-center justify-between py-2 px-3 rounded text-gray-600 hover:text-blue-700 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* Info User & Logout (Mobile) */}
              <li className="pt-4 mt-4 border-t border-gray-100">
                <span className="block py-2 px-3 text-sm text-gray-600">{userEmail}</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left block py-2 px-3 text-red-600 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
