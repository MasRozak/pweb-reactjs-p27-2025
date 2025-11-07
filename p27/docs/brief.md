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

## ✨ Good Luck, Team!

**Dimas, Arul, Danar - semangat ngoding! 🚀**
