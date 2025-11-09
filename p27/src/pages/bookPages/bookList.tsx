// src/pages/bookPages/bookList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../../api/books';
import { useCart } from '../../contexts/cartContext';
import Navbar from '../../components/navbar';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import EmptyState from '../../components/EmptyState';

interface Book {
  id: string;
  title: string;
  writer: string;
  publisher: string;
  price: number;
  stock_quantity: number;
  genre: string;
  condition?: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'POOR';
  publication_year?: number;
}

interface Meta {
  page: number;
  limit: number;
  prev_page: number | null;
  next_page: number | null;
}

const BookList = () => {
  const { addToCart, isInCart } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    prev_page: null,
    next_page: null,
  });

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [condition, setCondition] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'publish_date'>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  console.log('BookList component rendered', {
    loading,
    error,
    booksCount: books.length,
    page,
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page,
        limit: 10,
      };

      if (search) params.search = search;
      if (condition) params.condition = condition;
      
      if (sortBy === 'title') {
        params.orderByTitle = order;
      } else if (sortBy === 'publish_date') {
        params.orderByPublishDate = order;
      }

      console.log('Fetching books with params:', params);
      const response = await getBooks(params);
      console.log('Books response:', response);
      
      if (response.success) {
        setBooks(response.data);
        console.log('Books data:', response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error('Error fetching books:', err);
      setError(err.response?.data?.message || 'Gagal memuat daftar buku');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, condition, sortBy, order, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1); // Reset ke halaman pertama saat search
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'title_asc') {
      setSortBy('title');
      setOrder('asc');
    } else if (value === 'title_desc') {
      setSortBy('title');
      setOrder('desc');
    } else if (value === 'date_asc') {
      setSortBy('publish_date');
      setOrder('asc');
    } else if (value === 'date_desc') {
      setSortBy('publish_date');
      setOrder('desc');
    }
    setPage(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatCondition = (condition?: string) => {
    if (!condition) return '-';
    return condition.replace(/_/g, ' ');
  };

  const handleAddToCart = (book: Book) => {
    if (book.stock_quantity === 0) {
      alert('Book is out of stock!');
      return;
    }

    addToCart({
      id: book.id,
      title: book.title,
      writer: book.writer,
      price: book.price,
      stock_quantity: book.stock_quantity,
    });

    alert(`"${book.title}" added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Daftar Buku</h1>
            <p className="text-gray-600">Kelola koleksi buku perpustakaan Anda</p>
          </div>
          <Link to="/books/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-semibold">
              <span className="text-xl">+</span>
              <span>Tambah Buku</span>
            </button>
          </Link>
        </div>

        {/* Filters & Search Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Filter & Pencarian</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Cari judul atau penulis..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Cari
              </button>
            </form>

            {/* Filter by Condition */}
            <select
              value={condition}
              onChange={handleConditionChange}
              className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Semua Kondisi</option>
              <option value="NEW">New</option>
              <option value="LIKE_NEW">Like New</option>
              <option value="VERY_GOOD">Very Good</option>
              <option value="GOOD">Good</option>
              <option value="ACCEPTABLE">Acceptable</option>
              <option value="POOR">Poor</option>
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}_${order}`}
              onChange={handleSortChange}
              className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="title_asc">Judul (A-Z)</option>
              <option value="title_desc">Judul (Z-A)</option>
              <option value="date_asc">Tahun Terbit (Lama-Baru)</option>
              <option value="date_desc">Tahun Terbit (Baru-Lama)</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 bg-white rounded-xl shadow-md">
            <Loader />
            <p className="mt-4 text-gray-600">Memuat data buku...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <ErrorMessage message={error} />
          </div>
        ) : books.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12">
            <EmptyState message="Tidak ada buku ditemukan" />
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Total: {books.length} buku</span>
                  <span className="mx-2">•</span>
                  <span className="text-blue-100">Halaman {meta.page}</span>
                </div>
                <div className="text-sm text-blue-100">
                  Menampilkan {books.length} dari {meta.limit} per halaman
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-100">
                  <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Judul
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Penulis
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Genre
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Harga
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Stok
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Kondisi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-50">
                    {books.map((book, index) => (
                      <tr 
                        key={book.id} 
                        className={`hover:bg-blue-50 transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{book.title}</div>
                          {book.publication_year && (
                            <div className="text-xs text-gray-500 mt-1">Tahun {book.publication_year}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{book.writer}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                            {book.genre}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-green-700">
                            {formatPrice(book.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${
                              book.stock_quantity > 10 ? 'text-green-600' : 
                              book.stock_quantity > 0 ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}>
                              {book.stock_quantity}
                            </span>
                            {book.stock_quantity === 0 && (
                              <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                                Habis
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {formatCondition(book.condition)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddToCart(book)}
                              disabled={book.stock_quantity === 0 || isInCart(book.id)}
                              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md ${
                                book.stock_quantity === 0
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : isInCart(book.id)
                                  ? 'bg-green-600 text-white cursor-default'
                                  : 'bg-orange-600 text-white hover:bg-orange-700'
                              }`}
                              title={
                                book.stock_quantity === 0
                                  ? 'Out of stock'
                                  : isInCart(book.id)
                                  ? 'Already in cart'
                                  : 'Add to cart'
                              }
                            >
                              {isInCart(book.id) ? (
                                <>
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  In Cart
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Add
                                </>
                              )}
                            </button>
                            <Link
                              to={`/books/${book.id}`}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                            >
                              Detail
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md border border-blue-100">
              <div className="text-sm text-gray-700 font-medium">
                Halaman <span className="text-blue-600 font-bold">{meta.page}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!meta.prev_page}
                  className="px-5 py-2.5 border border-blue-300 text-blue-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition-all font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm"
                >
                  ← Sebelumnya
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!meta.next_page}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm"
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookList;
