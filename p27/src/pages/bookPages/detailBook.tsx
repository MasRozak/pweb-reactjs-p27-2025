// src/pages/bookPages/detailBook.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, deleteBook } from '../../api/books';
import Navbar from '../../components/navbar';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

interface BookDetail {
  id: string;
  title: string;
  writer: string;
  publisher: string;
  description?: string;
  publication_year?: number;
  price: number;
  stock_quantity: number;
  genre: string;
  isbn?: string;
  condition?: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'POOR';
}

const DetailBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('ID buku tidak valid');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getBookById(id);
        
        if (response.success) {
          setBook(response.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Gagal memuat detail buku');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setDeleting(true);
      const response = await deleteBook(id);
      
      if (response.success) {
        // Redirect to book list after successful deletion
        navigate('/books');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menghapus buku');
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-20">
          <Loader />
          <p className="mt-4 text-gray-600">Memuat detail buku...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <ErrorMessage message={error || 'Buku tidak ditemukan'} />
          </div>
          <div className="mt-6">
            <Link to="/books" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">
              <span className="text-xl">←</span>
              <span>Kembali ke Daftar Buku</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/books')}
          className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <span className="text-xl">←</span>
          <span>Kembali ke Daftar Buku</span>
        </button>

        {/* Book Detail Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
            <h1 className="text-4xl font-bold mb-3">{book.title}</h1>
            <p className="text-blue-100 text-lg">oleh {book.writer}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Penulis</h3>
                  <p className="text-lg text-gray-900 font-medium">{book.writer}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Penerbit</h3>
                  <p className="text-lg text-gray-900 font-medium">{book.publisher}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Genre</h3>
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                    {book.genre}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                  <h3 className="text-xs font-bold text-green-900 uppercase tracking-wider mb-2">Harga</h3>
                  <p className="text-3xl font-bold text-green-700">{formatPrice(book.price)}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Stok</h3>
                  <div className="flex items-center gap-3">
                    <p className={`text-lg font-semibold ${
                      book.stock_quantity > 10 ? 'text-green-600' : 
                      book.stock_quantity > 0 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {book.stock_quantity} unit
                    </p>
                    {book.stock_quantity === 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        Habis
                      </span>
                    )}
                  </div>
                </div>

                {book.isbn && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">ISBN</h3>
                    <p className="text-lg text-gray-900 font-mono">{book.isbn}</p>
                  </div>
                )}

                {book.publication_year && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Tahun Terbit</h3>
                    <p className="text-lg text-gray-900 font-medium">{book.publication_year}</p>
                  </div>
                )}

                {book.condition && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Kondisi</h3>
                    <p className="text-lg text-gray-900 font-medium">{formatCondition(book.condition)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="mt-8 pt-8 border-t-2 border-blue-100">
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4">Deskripsi</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t-2 border-blue-100 flex gap-4">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg font-semibold"
              >
                Hapus Buku
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border-2 border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Apakah Anda yakin ingin menghapus buku "<strong className="text-blue-900">{book.title}</strong>"? 
                Tindakan ini tidak dapat dibatalkan.
              </p>
              
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <ErrorMessage message={error} />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all font-semibold"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBook;
