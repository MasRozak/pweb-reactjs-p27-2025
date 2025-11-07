// src/components/navbar.tsx
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
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
          Transactions
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
