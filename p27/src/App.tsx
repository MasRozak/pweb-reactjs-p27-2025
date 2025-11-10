// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';

// Import halaman Auth
import LoginPage from './pages/authPages/loginPageSimple';
import RegisterPage from './pages/authPages/registerPage';

// Import halaman Books
import BookList from './pages/bookPages/bookList';
import DetailBook from './pages/bookPages/detailBook';
import AddBook from './pages/bookPages/addBook';
import TestAPI from './pages/bookPages/testAPI';

import ListTransactions from './pages/transactionPages/listTransactions';
import DetailTransaction from './pages/transactionPages/detailTransaction';
import CreateTransaction from './pages/transactionPages/createTransaction';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Rute Publik */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test-api" element={<TestAPI />} />

        {/* Rute Terproteksi */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/:id" element={<DetailBook />} />
          <Route path="/transactions" element={<ListTransactions />} />
          <Route path="/transactions/:id" element={<DetailTransaction />} />
          <Route path="/transactions/add" element={<CreateTransaction />} />
        </Route>

        {/* Halaman 404 */}
        <Route path="*" element={<div className="p-8 text-center">404 - Halaman tidak ditemukan</div>} />
      </Routes>
    </div>
  );
};

export default App;