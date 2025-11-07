# 📚 Library Management System

Aplikasi manajemen perpustakaan berbasis web yang dibangun dengan **ReactJS + TypeScript + Tailwind CSS**. Aplikasi ini menyediakan fitur autentikasi, manajemen buku, dan sistem transaksi.

---

## 🚀 Tech Stack

- **Frontend Framework:** React 19.1.1
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.17
- **Routing:** React Router DOM 7.9.5
- **HTTP Client:** Axios 1.13.2
- **Build Tool:** Vite 7.1.7

---

## ✨ Fitur Utama

### 🔐 Autentikasi
- Login & Register dengan validasi form
- Token-based authentication (disimpan di localStorage)
- Protected routes untuk halaman yang memerlukan autentikasi
- Logout dengan clear token
- Navbar menampilkan email user yang sedang login

### 📚 Manajemen Buku
- **List Buku** dengan fitur:
  - Search (berdasarkan title/writer)
  - Filter by condition (New, Good, Fair, Poor)
  - Sort (by title, publication date)
  - Pagination
- **Detail Buku** - menampilkan informasi lengkap buku
- **Tambah Buku** - form untuk menambah buku baru dengan dropdown genre dari API
- **Hapus Buku** - dengan konfirmasi sebelum menghapus

### 💰 Transaksi
- **Buat Transaksi** - checkout dengan kemampuan membeli >1 item
- **List Transaksi** dengan fitur:
  - Search by transaction ID
  - Sort (by ID, amount, price)
  - Pagination
- **Detail Transaksi** - menampilkan detail pembelian lengkap

### 🎨 UX Features
- Loading state untuk setiap request API
- Error handling & error messages
- Empty state ketika data kosong
- Form validation (client-side)
- Responsive design (mobile & desktop)

---

## 📁 Struktur Folder

```
src/
├── api/                      # API configuration & functions
│   ├── axiosInstance.ts      # Axios instance dengan interceptor
│   ├── books.ts              # Book-related API calls (optional)
│   └── transactions.ts       # Transaction-related API calls (optional)
│
├── assets/                   # Images, icons, fonts
│
├── components/               # Reusable components
│   ├── protectedRoute.tsx    # Protected route wrapper
│   ├── navbar.tsx            # Navigation bar
│   ├── Loader.tsx            # Loading spinner
│   ├── ErrorMessage.tsx      # Error display component
│   ├── EmptyState.tsx        # Empty state component
│   ├── Button.tsx            # Reusable button (optional)
│   ├── Input.tsx             # Reusable input (optional)
│   └── Card.tsx              # Reusable card (optional)
│
├── contexts/                 # Global state management
│   └── authContext.tsx       # Authentication context & hooks
│
├── hooks/                    # Custom React hooks
│
├── pages/                    # Page components
│   ├── authPages/
│   │   ├── loginPage.tsx     # Login page
│   │   └── registerPage.tsx  # Register page
│   │
│   ├── bookPages/
│   │   ├── bookList.tsx      # Book list with search/filter/sort
│   │   ├── detailBook.tsx    # Book detail page
│   │   ├── addBook.tsx       # Add new book form
│   │   └── deleteBook.tsx    # Delete book confirmation
│   │
│   └── transactionPages/
│       ├── listTransactions.tsx    # Transaction list
│       ├── detailTransaction.tsx   # Transaction detail
│       └── createTransaction.tsx   # Checkout page
│
├── router/                   # Routing configuration
│   └── index.tsx             # Route definitions
│
├── types/                    # TypeScript type definitions
│   ├── book.types.ts         # Book & Genre interfaces
│   └── transaction.types.ts  # Transaction interfaces
│
├── utils/                    # Utility functions
│   └── token.ts              # Token management (localStorage)
│
├── App.tsx                   # Main app component
├── main.tsx                  # React entry point
└── index.css                 # Global styles (Tailwind directives)
```

---

## 🛠️ Installation

### Prerequisites
- **Node.js** (v18 atau lebih tinggi)
- **npm** atau **yarn**
- **Backend API** yang sudah running

### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/MasRozak/pweb-reactjs-p27-2025.git
   cd pweb-reactjs-p27-2025/p27
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi API Base URL**
   
   Edit file `src/api/axiosInstance.ts`:
   ```typescript
   const axiosInstance = axios.create({
     baseURL: 'http://localhost:5000/api/v1', // Ganti dengan URL backend Anda
     timeout: 10000,
   });
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   ```
   http://localhost:5173
   ```

---

## 📜 Available Scripts

```bash
# Development server (dengan hot reload)
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

---

## 🔑 Environment Setup

Pastikan backend API Anda memiliki endpoint berikut:

### Authentication Endpoints
- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login dan dapatkan token

### Book Endpoints
- `GET /books` - Get all books (dengan query params untuk search, filter, sort, pagination)
- `GET /books/:id` - Get book detail
- `POST /books` - Create new book (authenticated)
- `DELETE /books/:id` - Delete book (authenticated)
- `GET /genres` - Get all genres

### Transaction Endpoints
- `GET /transactions` - Get user transactions (authenticated)
- `GET /transactions/:id` - Get transaction detail (authenticated)
- `POST /transactions` - Create new transaction (authenticated)

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Register dengan email & password valid
- [ ] Login dengan credentials yang benar
- [ ] Login dengan credentials yang salah (harus muncul error)
- [ ] Akses protected route tanpa login (harus redirect ke /login)
- [ ] Logout (token harus terhapus, redirect ke /login)

#### Books
- [ ] Lihat list buku
- [ ] Search buku berdasarkan title/writer
- [ ] Filter buku berdasarkan condition
- [ ] Sort buku (by title, by date)
- [ ] Pagination (next/prev)
- [ ] Klik buku untuk lihat detail
- [ ] Tambah buku baru (validasi form)
- [ ] Hapus buku (dengan konfirmasi)

#### Transactions
- [ ] Buat transaksi (pilih >1 buku dengan quantity)
- [ ] Lihat list transaksi
- [ ] Search transaksi by ID
- [ ] Sort transaksi (by ID, amount, price)
- [ ] Pagination
- [ ] Lihat detail transaksi

#### UX
- [ ] Loading state muncul saat fetch data
- [ ] Error message muncul jika API gagal
- [ ] Empty state muncul jika data kosong
- [ ] Form validation bekerja (required fields, email format)
- [ ] Responsive di mobile & desktop

---

## 👥 Tim Pengembang

| Nama | Tanggung Jawab | GitHub |
|------|----------------|--------|
| **Dimas** | Autentikasi & UX Components | [@dimas](#) |
| **Arul** | Manajemen Buku | [@arul](#) |
| **Danar** | Transaksi | [@danar](#) |

Untuk detail pembagian tugas, lihat [docs/brief.md](./docs/brief.md)

---

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
# Ubah port di vite.config.ts atau kill process yang menggunakan port 5173
```

### Tailwind CSS tidak bekerja
```bash
# Pastikan file index.css sudah import Tailwind directives
# @tailwind base;
# @tailwind components;
# @tailwind utilities;
```

### CORS Error
```bash
# Pastikan backend sudah enable CORS
# Atau gunakan proxy di vite.config.ts
```

### Token tidak tersimpan
```bash
# Cek localStorage di browser DevTools (Application tab)
# Pastikan fungsi saveToken() dipanggil setelah login sukses
```

---

## 📚 API Documentation

### Request Headers
Untuk endpoint yang memerlukan autentikasi:
```
Authorization: Bearer <token>
```

### Example Request & Response

#### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

#### Get Books
```bash
GET /books?page=1&limit=10&search=harry&sortBy=title&order=asc

# Response
{
  "data": [
    {
      "id": 1,
      "title": "Harry Potter",
      "writer": "J.K. Rowling",
      "price": 150000,
      "stock": 10,
      "genre": "Fantasy"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

#### Create Transaction
```bash
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "book_id": 1, "quantity": 2 },
    { "book_id": 3, "quantity": 1 }
  ]
}

# Response
{
  "id": 123,
  "total_amount": 3,
  "total_price": 450000,
  "created_at": "2025-11-07T10:00:00Z"
}
```

---

## 🎨 UI/UX Guidelines

### Colors (Tailwind)
- **Primary:** `indigo-600` (buttons, links)
- **Success:** `green-600` (success messages)
- **Error:** `red-600` (error messages)
- **Background:** `blue-50` to `indigo-100` gradient

### Typography
- **Headings:** `font-bold` dengan size yang sesuai
- **Body:** Default system font
- **Code:** `bg-gray-100` dengan `font-mono`

### Spacing
- Konsisten menggunakan Tailwind spacing scale (4, 8, 16, 24, 32)
- Card padding: `p-8`
- Section margin: `mb-6` atau `mb-8`

---

## 📝 Notes

- Aplikasi ini adalah project tugas Pemrograman Web
- Backend API harus sudah running sebelum menjalankan frontend
- Token disimpan di localStorage (untuk production, pertimbangkan httpOnly cookies)
- Validasi hanya di client-side (backend juga harus validasi)

---

## 📄 License

MIT License - Free to use for educational purposes

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan buka issue di GitHub repository atau hubungi tim pengembang.

---

**Made with ❤️ by Dimas, Arul & Danar**
