# Project Brief - Library Management System

## 📋 Overview
Aplikasi manajemen perpustakaan dengan fitur autentikasi, manajemen buku, dan transaksi menggunakan **ReactJS + TypeScript + Tailwind CSS**.

---

## 👥 Tim & Pembagian Tugas

### 🔐 **Dimas - Autentikasi & UX**
**Tanggung Jawab:**
- Implementasi sistem autentikasi lengkap
- Menangani semua aspek UX (loading, error, empty state)
- Setup global components untuk reusability

#### **Task List:**

##### 1. **Autentikasi** 
**Lokasi:** `src/pages/authPages/`, `src/contexts/`, `src/utils/`, `src/components/`

- [ ] **Login Page** (`src/pages/authPages/loginPage.tsx`)
  - Form dengan field: email & password
  - Validasi client-side (email format, required fields)
  - Kirim POST ke `/auth/login`
  - Simpan token ke localStorage menggunakan `saveToken()` dari `src/utils/token.ts`
  - Redirect ke `/books` setelah berhasil login
  - Tampilkan error message jika gagal

- [ ] **Register Page** (`src/pages/authPages/registerPage.tsx`)
  - Form dengan field: email, password, confirm password
  - Validasi client-side (password match, email format)
  - Kirim POST ke `/auth/register`
  - Redirect ke `/login` setelah berhasil register
  - Tampilkan error message jika gagal

- [ ] **Auth Context** (`src/contexts/authContext.tsx`) ✅ *Sudah ada, perlu dilengkapi*
  - Tambahkan fungsi `login(token, email)` untuk update state
  - Fungsi `logout()` sudah ada, tambahkan `navigate('/login')` di dalamnya
  - Load state `isAuthenticated` dari token di localStorage saat pertama kali

- [ ] **Protected Route** (`src/components/protectedRoute.tsx`) ✅ *Sudah ada*
  - Sudah benar, pastikan semua rute protected menggunakan component ini

- [ ] **Navbar Component** (`src/components/navbar.tsx`)
  - Tampilkan logo/nama aplikasi
  - Link ke `/books` (Daftar Buku)
  - Link ke `/transactions` (Transaksi)
  - Tampilkan email user yang sedang login (ambil dari AuthContext)
  - Tombol **Logout** yang memanggil `logout()` dari AuthContext
  - Responsive untuk mobile & desktop

##### 2. **UX Components & States**
**Lokasi:** `src/components/`

- [ ] **Loading Component** (`src/components/Loader.tsx`)
  - Spinner/skeleton untuk loading state
  - Bisa dipakai di semua halaman
  - Props: `message?: string`

- [ ] **Error Component** (`src/components/ErrorMessage.tsx`)
  - Tampilan error yang konsisten
  - Props: `message: string`, `onRetry?: () => void`

- [ ] **Empty State Component** (`src/components/EmptyState.tsx`)
  - Tampilan ketika data kosong
  - Props: `message: string`, `icon?: ReactNode`

- [ ] **Button Component** (`src/components/Button.tsx`) *Optional tapi disarankan*
  - Reusable button dengan variants (primary, secondary, danger)
  - Props: `variant`, `onClick`, `disabled`, `loading`, `children`

- [ ] **Input Component** (`src/components/Input.tsx`) *Optional tapi disarankan*
  - Reusable input field dengan error handling
  - Props: `type`, `value`, `onChange`, `error`, `label`, `placeholder`

- [ ] **Card Component** (`src/components/Card.tsx`) *Optional tapi disarankan*
  - Container untuk book items, transaction items
  - Props: `children`, `className?`, `onClick?`

##### 3. **Global UX Implementation**
- [ ] Pastikan semua form memiliki validasi client-side
- [ ] Semua API request menampilkan loading state
- [ ] Error handling yang jelas di setiap page
- [ ] Responsive design (test di mobile & desktop)
- [ ] Konsistensi UI/UX di semua halaman

---

### 📚 **Arul - Manajemen Buku**
**Tanggung Jawab:**
- CRUD Buku (Create, Read, Delete)
- Search, Filter, Sort, Pagination
- Integrasi dengan API backend

#### **Task List:**

##### 1. **Book List Page** (`src/pages/bookPages/bookList.tsx`)
**Fitur Utama:**
- [ ] Fetch semua buku dari API: `GET /books`
- [ ] Tampilkan dalam bentuk card/table dengan data:
  - Title, Writer, Price, Stock, Genre
- [ ] **Search Bar**: Filter berdasarkan title/writer (real-time atau button submit)
- [ ] **Filter by Condition**: Dropdown untuk filter (New, Good, Fair, Poor, All)
- [ ] **Sort**: 
  - Order by Title (A-Z, Z-A)
  - Order by Publication Date (Newest, Oldest)
- [ ] **Pagination**: 
  - Tampilkan per 10 buku per halaman
  - Previous/Next button
  - Page numbers
- [ ] Tombol **Add Book** yang mengarah ke `/books/add`
- [ ] Setiap card/row buku bisa di-klik untuk ke detail (`/books/:id`)
- [ ] Gunakan komponen Loading, Error, EmptyState dari Dimas
- [ ] Responsive layout

**API Query Parameters:**
```
GET /books?page=1&limit=10&search=Harry&genre=Fiction&condition=New&sortBy=title&order=asc
```

##### 2. **Book Detail Page** (`src/pages/bookPages/detailBook.tsx`)
**Fitur Utama:**
- [ ] Fetch detail buku: `GET /books/:id`
- [ ] Tampilkan semua informasi:
  - Title, Writer, Publisher
  - Price, Stock, Genre
  - ISBN (optional)
  - Description (optional)
  - Publication Year (optional)
  - Condition (optional)
  - Book Image (optional - jika ditambahkan di backend)
- [ ] Tombol **Edit** (mengarah ke edit page - optional)
- [ ] Tombol **Delete** (panggil delete functionality)
- [ ] Tombol **Back to List**
- [ ] Loading & Error state

##### 3. **Add Book Page** (`src/pages/bookPages/addBook.tsx`)
**Fitur Utama:**
- [ ] Form dengan field:
  - Title (required)
  - Writer (required)
  - Publisher (required)
  - Price (required, number)
  - Stock (required, number)
  - Genre (required, **dropdown** dari API: `GET /genres`)
  - ISBN (optional)
  - Description (optional, textarea)
  - Publication Year (optional, number)
  - Condition (optional, select: New/Good/Fair/Poor)
  - Book Image (optional - jika implement upload)
- [ ] Validasi semua required fields
- [ ] Fetch list genre dari `/genres` untuk dropdown
- [ ] Submit form: `POST /books` dengan body JSON
- [ ] Success: redirect ke `/books` atau `/books/:id` (buku baru)
- [ ] Error: tampilkan error message
- [ ] Tombol Cancel yang kembali ke list

##### 4. **Delete Book** (`src/pages/bookPages/deleteBook.tsx` atau modal)
**Fitur Utama:**
- [ ] **Konfirmasi sebelum hapus**: 
  - Bisa pakai modal/dialog atau halaman terpisah
  - Tampilkan pesan: "Apakah Anda yakin ingin menghapus buku [Title]?"
- [ ] Tombol **Confirm Delete**: 
  - Kirim `DELETE /books/:id`
  - Success: redirect ke `/books` dengan success message
  - Error: tampilkan error message
- [ ] Tombol **Cancel**

**Alternative:** Bisa juga delete button langsung di BookDetail atau BookList dengan confirmation modal.

##### 5. **TypeScript Types** (`src/types/book.types.ts`)
- [ ] Define interface untuk Book:
```typescript
export interface Book {
  id: number;
  title: string;
  writer: string;
  publisher: string;
  price: number;
  stock: number;
  genre: string;
  isbn?: string;
  description?: string;
  publication_year?: number;
  condition?: 'New' | 'Good' | 'Fair' | 'Poor';
  book_image?: string; // optional
}

export interface Genre {
  id: number;
  name: string;
}
```

##### 6. **API Functions** (`src/api/books.ts`) *Optional tapi disarankan*
- [ ] Buat fungsi API untuk books:
```typescript
export const getBooks = (params) => axiosInstance.get('/books', { params });
export const getBookById = (id) => axiosInstance.get(`/books/${id}`);
export const createBook = (data) => axiosInstance.post('/books', data);
export const deleteBook = (id) => axiosInstance.delete(`/books/${id}`);
export const getGenres = () => axiosInstance.get('/genres');
```

---

### 💰 **Danar - Transaksi**
**Tanggung Jawab:**
- Sistem checkout (beli buku)
- List & detail transaksi
- Search, Sort, Pagination untuk transaksi

#### **Task List:**

##### 1. **Create Transaction Page** (`src/pages/transactionPages/createTransaction.tsx`)
**Fitur Utama:**
- [ ] **Form Checkout** dengan kemampuan beli >1 item:
  - List buku yang tersedia (bisa fetch dari `/books`)
  - User bisa pilih buku (checkbox atau add to cart)
  - Input quantity untuk setiap buku
  - Tampilkan subtotal per item (price × quantity)
  - Tampilkan **total harga** keseluruhan
- [ ] Validasi:
  - Minimal 1 buku harus dipilih
  - Quantity tidak boleh > stock
  - Quantity harus > 0
- [ ] Submit: `POST /transactions` dengan body:
```json
{
  "items": [
    { "book_id": 1, "quantity": 2 },
    { "book_id": 3, "quantity": 1 }
  ]
}
```
- [ ] Success: redirect ke `/transactions` atau `/transactions/:id` (transaksi baru)
- [ ] Error handling & loading state
- [ ] Tombol **Cancel** kembali ke list transaksi

**Alternative Implementation:** Bisa juga buat tombol "Buy" di Book Detail yang langsung checkout 1 buku.

##### 2. **Transaction List Page** (`src/pages/transactionPages/listTransactions.tsx`)
**Fitur Utama:**
- [ ] Fetch transaksi user: `GET /transactions` (hanya milik user yang login)
- [ ] Tampilkan dalam bentuk table/card dengan data:
  - Transaction ID
  - Date/Time
  - Total Amount (jumlah item)
  - Total Price
- [ ] **Search by ID**: Input untuk cari berdasarkan transaction ID
- [ ] **Sort**:
  - Order by ID (ascending, descending)
  - Order by Amount (ascending, descending)
  - Order by Price (ascending, descending)
- [ ] **Pagination**:
  - Per 10 transaksi per halaman
  - Previous/Next button
  - Page numbers
- [ ] Setiap row/card bisa diklik ke detail (`/transactions/:id`)
- [ ] Tombol **Create Transaction** yang mengarah ke `/transactions/add`
- [ ] Loading, Error, EmptyState dari Dimas

**API Query Parameters:**
```
GET /transactions?page=1&limit=10&search=123&sortBy=price&order=desc
```

##### 3. **Transaction Detail Page** (`src/pages/transactionPages/detailTransaction.tsx`)
**Fitur Utama:**
- [ ] Fetch detail: `GET /transactions/:id`
- [ ] Tampilkan informasi:
  - Transaction ID
  - Date/Time
  - User Email
  - **List items** yang dibeli:
    - Book Title
    - Quantity
    - Price per item
    - Subtotal
  - **Total Amount** (total quantity semua buku)
  - **Total Price** (grand total)
- [ ] Tombol **Back to Transactions**
- [ ] Loading & Error state
- [ ] Optional: Print receipt button

##### 4. **TypeScript Types** (`src/types/transaction.types.ts`)
- [ ] Define interface untuk Transaction:
```typescript
export interface TransactionItem {
  book_id: number;
  book_title?: string; // dari response detail
  quantity: number;
  price: number;
  subtotal?: number;
}

export interface Transaction {
  id: number;
  user_id: number;
  user_email?: string;
  total_amount: number;
  total_price: number;
  created_at: string;
  items?: TransactionItem[]; // untuk detail
}

export interface CreateTransactionRequest {
  items: {
    book_id: number;
    quantity: number;
  }[];
}
```

##### 5. **API Functions** (`src/api/transactions.ts`) *Optional tapi disarankan*
- [ ] Buat fungsi API untuk transactions:
```typescript
export const getTransactions = (params) => axiosInstance.get('/transactions', { params });
export const getTransactionById = (id) => axiosInstance.get(`/transactions/${id}`);
export const createTransaction = (data) => axiosInstance.post('/transactions', data);
```

##### 6. **Integration dengan Navbar**
- [ ] Pastikan link `/transactions` di Navbar (akan dibuat Dimas) berfungsi dengan baik
- [ ] Test navigasi antar halaman transaksi

---

## 🗂️ Struktur Folder

```
src/
├── api/
│   ├── axiosInstance.ts        ✅ Sudah ada (perlu update baseURL)
│   ├── books.ts                → Arul (optional)
│   └── transactions.ts         → Danar (optional)
│
├── assets/                     → Semua (gambar/icons jika perlu)
│
├── components/
│   ├── protectedRoute.tsx      ✅ Dimas (sudah ada)
│   ├── navbar.tsx              → Dimas (create)
│   ├── Loader.tsx              → Dimas
│   ├── ErrorMessage.tsx        → Dimas
│   ├── EmptyState.tsx          → Dimas
│   ├── Button.tsx              → Dimas (optional)
│   ├── Input.tsx               → Dimas (optional)
│   └── Card.tsx                → Dimas (optional)
│
├── contexts/
│   └── authContext.tsx         ✅ Dimas (sudah ada, perlu dilengkapi)
│
├── hooks/                      → Semua (custom hooks jika perlu)
│   └── useAuth.ts              ✅ Sudah ada di authContext
│
├── pages/
│   ├── authPages/
│   │   ├── loginPage.tsx       → Dimas
│   │   └── registerPage.tsx    → Dimas
│   │
│   ├── bookPages/
│   │   ├── bookList.tsx        → Arul
│   │   ├── detailBook.tsx      → Arul
│   │   ├── addBook.tsx         → Arul
│   │   └── deleteBook.tsx      → Arul (atau modal di detailBook)
│   │
│   └── transactionPages/
│       ├── listTransactions.tsx    → Danar
│       ├── detailTransaction.tsx   → Danar
│       └── createTransaction.tsx   → Danar
│
├── router/
│   └── index.tsx               ✅ Sudah ada (perlu update dengan page imports)
│
├── types/
│   ├── book.types.ts           → Arul
│   └── transaction.types.ts    → Danar
│
├── utils/
│   └── token.ts                ✅ Sudah ada
│
├── App.tsx                     ✅ Sudah ada
├── main.tsx                    ✅ Sudah ada
└── index.css                   ✅ Sudah ada (Tailwind)
```

---

## 🔧 Setup Awal (Sudah Selesai)

✅ **Folder structure** sudah dibuat  
✅ **Tailwind CSS** sudah terinstall  
✅ **React Router** sudah terinstall  
✅ **Axios** sudah terinstall  
✅ **AuthContext** dasar sudah ada  
✅ **ProtectedRoute** sudah ada  
✅ **Token utils** sudah ada  

---

## ⚙️ Konfigurasi yang Perlu Diupdate

### 1. **API Base URL** (`src/api/axiosInstance.ts`)
```typescript
baseURL: 'http://API-BACKEND-KAMU.com/api/v1', // <-- GANTI INI
```
**Action:** Ganti dengan URL backend yang sebenarnya.

### 2. **Router** (`src/router/index.tsx`)
**Action:** Import semua page components dan ganti placeholder `<div>` dengan component sebenarnya.

---

## 📝 Checklist Umum

### **Semua Tim**
- [ ] Pastikan setiap page responsive (mobile & desktop)
- [ ] Gunakan TypeScript dengan benar (no `any` sembarangan)
- [ ] Loading state untuk setiap API call
- [ ] Error handling yang proper
- [ ] Empty state jika data kosong
- [ ] Validasi form di client-side
- [ ] Konsistensi UI/UX (gunakan komponen reusable dari Dimas)

### **Dimas**
- [ ] Autentikasi lengkap (login, register, logout)
- [ ] Navbar dengan tombol logout & email user
- [ ] Protected route berfungsi
- [ ] Semua reusable components siap dipakai
- [ ] UX guidelines untuk tim

### **Arul**
- [ ] CRUD Buku lengkap (Create, Read, Delete)
- [ ] Search, Filter, Sort, Pagination di Book List
- [ ] Genre dropdown dari API
- [ ] TypeScript types untuk Book

### **Danar**
- [ ] Create transaction (checkout >1 item)
- [ ] List transaksi dengan search & sort
- [ ] Detail transaksi lengkap
- [ ] TypeScript types untuk Transaction

---

## 🚀 Tips Kolaborasi

1. **Koordinasi di Awal:** 
   - Dimas selesaikan auth + reusable components dulu
   - Arul & Danar bisa mulai dengan static UI dulu, lalu integrate API

2. **Git Workflow:**
   - Buat branch per fitur: `feature/auth`, `feature/books`, `feature/transactions`
   - Commit sering dengan message yang jelas
   - Merge ke `main` setelah fitur selesai & tested

3. **Testing:**
   - Test setiap fitur sebelum merge
   - Test integrasi antar fitur (misalnya: login → book list → transaction)

4. **Communication:**
   - Update progress di grup
   - Tanya jika ada blocker atau butuh bantuan
   - Review code satu sama lain

---

## 📚 Resources

- **React Router:** https://reactrouter.com/
- **Axios:** https://axios-http.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs/

---

## 🔌 Cara Memanggil API

Semua API function sudah tersedia di folder `src/api/`. Berikut cara menggunakannya:

### **Import API Functions**

```typescript
// Import dari central index (recommended)
import { login, getBooks, createTransaction } from '@/api';

// Atau import langsung dari file spesifik
import { login, register, getCurrentUser } from '@/api/auth';
import { getBooks, createBook, deleteBook } from '@/api/books';
import { getGenres } from '@/api/genres';
import { createTransaction, getTransactions } from '@/api/transactions';
```

### **1. Authentication APIs** (`src/api/auth.ts`)

#### **Register**
```typescript
import { register } from '@/api/auth';
import { saveToken } from '@/utils/token';

const handleRegister = async () => {
  try {
    const response = await register({
      username: 'John Doe', // optional
      email: 'john@example.com',
      password: 'Password123'
    });
    console.log(response.data); // { id, email, created_at }
    // Redirect ke login page
  } catch (error) {
    console.error('Register failed:', error);
  }
};
```

#### **Login**
```typescript
import { login } from '@/api/auth';
import { saveToken } from '@/utils/token';

const handleLogin = async () => {
  try {
    const response = await login({
      email: 'john@example.com',
      password: 'Password123'
    });
    
    // Simpan token ke localStorage
    saveToken(response.data.access_token);
    
    // Redirect ke /books atau update AuthContext
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

#### **Get Current User**
```typescript
import { getCurrentUser } from '@/api/auth';

const fetchCurrentUser = async () => {
  try {
    const response = await getCurrentUser();
    console.log(response.data); // { id, username, email }
  } catch (error) {
    console.error('Failed to get user:', error);
  }
};
```

---

### **2. Books APIs** (`src/api/books.ts`)

#### **Get All Books (dengan filter, search, sort, pagination)**
```typescript
import { getBooks } from '@/api/books';

const fetchBooks = async () => {
  try {
    const response = await getBooks({
      page: 1,
      limit: 10,
      search: 'Harry Potter',
      orderByTitle: 'asc',
      orderByPublishDate: 'desc',
      condition: 'NEW'
    });
    
    console.log(response.data); // Array of books
    console.log(response.meta); // { page, limit, prev_page, next_page }
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }
};
```

#### **Get Book by ID**
```typescript
import { getBookById } from '@/api/books';

const fetchBookDetail = async (bookId: string) => {
  try {
    const response = await getBookById(bookId);
    console.log(response.data); // Book detail
  } catch (error) {
    console.error('Failed to fetch book:', error);
  }
};
```

#### **Create Book**
```typescript
import { createBook } from '@/api/books';

const handleCreateBook = async () => {
  try {
    const response = await createBook({
      title: 'New Book Title',
      writer: 'Author Name',
      publisher: 'Publisher Name',
      description: 'Book description',
      publication_year: 2025,
      price: 50000,
      stock_quantity: 100,
      genre_id: 'genre-uuid-here',
      isbn: 'ISBN123456', // optional
      condition: 'NEW' // optional
    });
    
    console.log(response.data); // { id, title, created_at }
  } catch (error) {
    console.error('Failed to create book:', error);
  }
};
```

#### **Update Book**
```typescript
import { updateBook } from '@/api/books';

const handleUpdateBook = async (bookId: string) => {
  try {
    // Hanya bisa update: description, price, stock_quantity
    const response = await updateBook(bookId, {
      description: 'Updated description',
      price: 60000,
      stock_quantity: 80
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Failed to update book:', error);
  }
};
```

#### **Delete Book**
```typescript
import { deleteBook } from '@/api/books';

const handleDeleteBook = async (bookId: string) => {
  try {
    const response = await deleteBook(bookId);
    console.log(response.message); // "Book removed successfully"
  } catch (error) {
    console.error('Failed to delete book:', error);
  }
};
```

#### **Get Books by Genre**
```typescript
import { getBooksByGenre } from '@/api/books';

const fetchBooksByGenre = async (genreId: string) => {
  try {
    const response = await getBooksByGenre(genreId, {
      page: 1,
      limit: 10,
      search: 'fantasy',
      orderByTitle: 'asc'
    });
    
    console.log(response.data); // Books in that genre
  } catch (error) {
    console.error('Failed to fetch books by genre:', error);
  }
};
```

---

### **3. Genres APIs** (`src/api/genres.ts`)

#### **Get All Genres**
```typescript
import { getGenres } from '@/api/genres';

const fetchGenres = async () => {
  try {
    const response = await getGenres({
      page: 1,
      limit: 10,
      search: 'fiction',
      orderByName: 'asc'
    });
    
    console.log(response.data); // Array of genres
    
    // Untuk dropdown, biasanya fetch all tanpa pagination
    const allGenres = await getGenres(); // tanpa params
    console.log(allGenres.data);
  } catch (error) {
    console.error('Failed to fetch genres:', error);
  }
};
```

#### **Get Genre by ID**
```typescript
import { getGenreById } from '@/api/genres';

const fetchGenreDetail = async (genreId: string) => {
  try {
    const response = await getGenreById(genreId);
    console.log(response.data); // { id, name }
  } catch (error) {
    console.error('Failed to fetch genre:', error);
  }
};
```

#### **Create Genre**
```typescript
import { createGenre } from '@/api/genres';

const handleCreateGenre = async () => {
  try {
    const response = await createGenre({
      name: 'Science Fiction'
    });
    
    console.log(response.data); // { id, name, created_at }
  } catch (error) {
    console.error('Failed to create genre:', error);
  }
};
```

---

### **4. Transactions APIs** (`src/api/transactions.ts`)

#### **Create Transaction (Checkout)**
```typescript
import { createTransaction } from '@/api/transactions';

const handleCheckout = async (userId: string) => {
  try {
    const response = await createTransaction({
      user_id: userId,
      items: [
        { book_id: 'book-uuid-1', quantity: 2 },
        { book_id: 'book-uuid-2', quantity: 1 },
        { book_id: 'book-uuid-3', quantity: 5 }
      ]
    });
    
    console.log(response.data); 
    // { transaction_id, total_quantity, total_price }
  } catch (error) {
    console.error('Failed to create transaction:', error);
  }
};
```

#### **Get All Transactions**
```typescript
import { getTransactions } from '@/api/transactions';

const fetchTransactions = async () => {
  try {
    const response = await getTransactions({
      page: 1,
      limit: 10,
      search: 'transaction-id', // search by ID
      orderById: 'desc',
      orderByAmount: 'asc',
      orderByPrice: 'desc'
    });
    
    console.log(response.data); // Array of transactions
    console.log(response.meta); // Pagination info
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
  }
};
```

#### **Get Transaction by ID**
```typescript
import { getTransactionById } from '@/api/transactions';

const fetchTransactionDetail = async (transactionId: string) => {
  try {
    const response = await getTransactionById(transactionId);
    console.log(response.data); 
    // { id, items: [{ book_id, book_title, quantity, subtotal_price }], 
    //   total_quantity, total_price }
  } catch (error) {
    console.error('Failed to fetch transaction:', error);
  }
};
```

#### **Get Transaction Statistics**
```typescript
import { getTransactionStatistics } from '@/api/transactions';

const fetchStatistics = async () => {
  try {
    const response = await getTransactionStatistics();
    console.log(response.data);
    // { total_transactions, average_transaction_amount, 
    //   fewest_book_sales_genre, most_book_sales_genre }
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
  }
};
```

---

### **5. Contoh Penggunaan di React Component**

#### **Dengan useState & useEffect**
```typescript
import { useState, useEffect } from 'react';
import { getBooks } from '@/api/books';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await getBooks({ page, limit: 10 });
        setBooks(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (books.length === 0) return <EmptyState message="No books found" />;

  return (
    <div>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
```

#### **Dengan Async/Await di Event Handler**
```typescript
import { useState } from 'react';
import { login } from '@/api/auth';
import { saveToken } from '@/utils/token';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      saveToken(response.data.access_token);
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

---

### **6. Error Handling Best Practices**

```typescript
import { getBooks } from '@/api/books';

const fetchBooks = async () => {
  try {
    const response = await getBooks();
    return response.data;
  } catch (error: any) {
    // Handle different error types
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  }
};
```

---

### **7. Tips Penting**

1. **Import Path Alias**: Gunakan `@/api` jika sudah setup path alias di `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Token Authentication**: Token otomatis ditambahkan ke header oleh `axiosInstance` interceptor, jadi tidak perlu manual set header di setiap request.

3. **Type Safety**: Semua API functions sudah memiliki TypeScript types yang jelas. Gunakan autocomplete IDE untuk melihat parameter dan return types.

4. **Error Handling**: Selalu gunakan try-catch untuk handle error dari API calls.

5. **Loading States**: Tampilkan loading indicator saat API request sedang berjalan.

6. **Response Structure**: Semua response dari API memiliki struktur:
   ```typescript
   {
     success: boolean,
     message: string,
     data: any,
     meta?: { page, limit, prev_page, next_page } // untuk pagination
   }
   ```

---

## ✨ Good Luck, Team!

**Dimas, Arul, Danar - semangat ngoding! 🚀**
