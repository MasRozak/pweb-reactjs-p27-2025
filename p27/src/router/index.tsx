// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute';
// import LoginPage from '../pages/authPages/loginPage';
// import RegisterPage from '../pages/authPages/registerPage';
// import BookList from '../pages/bookPages/bookList';
// import DetailBook from '../pages/bookPages/detailBook';
// import AddBook from '../pages/bookPages/addBook';
// import DeleteBook from '../pages/bookPages/deleteBook';
import ListTransactions from '../pages/transactionPages/listTransactions';
import DetailTransaction from '../pages/transactionPages/detailTransaction';
import CreateTransaction from '../pages/transactionPages/createTransaction';

export const router = createBrowserRouter([
  // Root redirect to transactions
  {
    path: '/',
    element: <Navigate to="/transactions" replace />
  },

//   // Rute Publik
//   { path: '/login', element: <LoginPage /> },
//   { path: '/register', element: <RegisterPage /> },

  // Rute Terproteksi
  {
    element: <ProtectedRoute />,
    children: [
    //   { path: '/books', element: <BookList /> },
    //   { path: '/books/:id', element: <DetailBook /> },
    //   { path: '/books/add', element: <AddBook /> },
    //   { path: '/books/delete', element: <DeleteBook /> },
      { path: '/transactions', element: <ListTransactions /> },
      { path: '/transactions/:id', element: <DetailTransaction /> },
      { path: '/transactions/add', element: <CreateTransaction /> },
    ]
  }
]);