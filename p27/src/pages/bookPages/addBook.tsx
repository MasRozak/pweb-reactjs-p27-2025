// src/pages/bookPages/addBook.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../api/books';
import { getGenres } from '../../api/genres';
import Navbar from '../../components/navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

interface Genre {
  id: string;
  name: string;
}

const AddBook = () => {
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    publisher: '',
    description: '',
    publication_year: '',
    price: '',
    stock_quantity: '',
    genre_id: '',
    isbn: '',
    condition: 'NEW' as 'NEW' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'POOR',
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoadingGenres(true);
        console.log('Fetching genres...');
        const response = await getGenres();
        console.log('Genres response:', response);
        
        // Check if response has data property
        if (response.success && response.data) {
          setGenres(response.data);
          console.log('Genres loaded:', response.data);
        } else if (Array.isArray(response)) {
          // If response is directly an array
          setGenres(response);
          console.log('Genres loaded (direct array):', response);
        } else {
          console.error('Unexpected response format:', response);
          setError('Format response genre tidak sesuai');
        }
      } catch (err: any) {
        console.error('Error fetching genres:', err);
        setError(err.response?.data?.message || 'Gagal memuat daftar genre. Pastikan backend sudah berjalan.');
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Required fields
    if (!formData.title.trim()) {
      errors.title = 'Judul buku harus diisi';
      isValid = false;
    }

    if (!formData.writer.trim()) {
      errors.writer = 'Nama penulis harus diisi';
      isValid = false;
    }

    if (!formData.publisher.trim()) {
      errors.publisher = 'Nama penerbit harus diisi';
      isValid = false;
    }

    if (!formData.price) {
      errors.price = 'Harga harus diisi';
      isValid = false;
    } else if (Number(formData.price) <= 0) {
      errors.price = 'Harga harus lebih dari 0';
      isValid = false;
    }

    if (!formData.stock_quantity) {
      errors.stock_quantity = 'Stok harus diisi';
      isValid = false;
    } else if (Number(formData.stock_quantity) < 0) {
      errors.stock_quantity = 'Stok tidak boleh negatif';
      isValid = false;
    }

    if (!formData.genre_id) {
      errors.genre_id = 'Genre harus dipilih';
      isValid = false;
    }

    // Optional: publication year validation
    if (formData.publication_year) {
      const year = Number(formData.publication_year);
      const currentYear = new Date().getFullYear();
      if (year < 1000 || year > currentYear) {
        errors.publication_year = `Tahun harus antara 1000 dan ${currentYear}`;
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data
      const bookData: any = {
        title: formData.title.trim(),
        writer: formData.writer.trim(),
        publisher: formData.publisher.trim(),
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
        genre_id: formData.genre_id,
        condition: formData.condition,
      };

      // Add optional fields
      if (formData.description.trim()) {
        bookData.description = formData.description.trim();
      }
      if (formData.publication_year) {
        bookData.publication_year = Number(formData.publication_year);
      }
      if (formData.isbn.trim()) {
        bookData.isbn = formData.isbn.trim();
      }

      const response = await createBook(bookData);

      if (response.success) {
        // Redirect to book list after successful creation
        navigate('/books');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menambahkan buku');
    } finally {
      setLoading(false);
    }
  };

  if (loadingGenres) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-20">
          <Loader />
          <p className="mt-4 text-gray-600">Memuat data genre...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/books')}
          className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <span className="text-xl">←</span>
          <span>Kembali ke Daftar Buku</span>
        </button>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Tambah Buku Baru</h1>
            <p className="text-gray-600 mt-2">Lengkapi informasi buku di bawah ini</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <ErrorMessage message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Input
                id="title"
                name="title"
                label="Judul Buku *"
                type="text"
                value={formData.title}
                onChange={handleChange}
                error={formErrors.title}
                disabled={loading}
              />
            </div>

            {/* Writer & Publisher Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="writer"
                name="writer"
                label="Penulis *"
                type="text"
                value={formData.writer}
                onChange={handleChange}
                error={formErrors.writer}
                disabled={loading}
              />

              <Input
                id="publisher"
                name="publisher"
                label="Penerbit *"
                type="text"
                value={formData.publisher}
                onChange={handleChange}
                error={formErrors.publisher}
                disabled={loading}
              />
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre_id" className="block text-sm font-bold text-blue-900 mb-2">
                Genre *
              </label>
              <select
                id="genre_id"
                name="genre_id"
                value={formData.genre_id}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
              >
                <option value="">
                  {genres.length === 0 ? 'Tidak ada genre tersedia' : 'Pilih Genre'}
                </option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              {formErrors.genre_id && (
                <p className="mt-2 text-sm text-red-600">{formErrors.genre_id}</p>
              )}
              {genres.length === 0 && !loadingGenres && (
                <p className="mt-2 text-sm text-yellow-600">
                  Belum ada genre. Pastikan backend sudah berjalan dan memiliki data genre.
                </p>
              )}
            </div>

            {/* Price & Stock Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-bold text-blue-900 mb-2">
                  Harga (IDR) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    Rp
                  </span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
                {formErrors.price && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.price}</p>
                )}
              </div>

              <Input
                id="stock_quantity"
                name="stock_quantity"
                label="Stok *"
                type="number"
                value={formData.stock_quantity}
                onChange={handleChange}
                error={formErrors.stock_quantity}
                disabled={loading}
              />
            </div>

            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block text-sm font-bold text-blue-900 mb-2">
                Kondisi Buku
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
              >
                <option value="NEW">New - Baru</option>
                <option value="LIKE_NEW">Like New - Seperti Baru</option>
                <option value="VERY_GOOD">Very Good - Sangat Baik</option>
                <option value="GOOD">Good - Baik</option>
                <option value="ACCEPTABLE">Acceptable - Dapat Diterima</option>
                <option value="POOR">Poor - Kurang Baik</option>
              </select>
            </div>

            {/* ISBN & Publication Year Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="isbn"
                name="isbn"
                label="ISBN (Opsional)"
                type="text"
                value={formData.isbn}
                onChange={handleChange}
                disabled={loading}
                placeholder="978-3-16-148410-0"
              />

              <Input
                id="publication_year"
                name="publication_year"
                label="Tahun Terbit (Opsional)"
                type="number"
                value={formData.publication_year}
                onChange={handleChange}
                error={formErrors.publication_year}
                disabled={loading}
                placeholder={new Date().getFullYear().toString()}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-blue-900 mb-2">
                Deskripsi (Opsional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                rows={5}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Masukkan deskripsi buku..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t-2 border-blue-100">
              <Button 
                type="submit" 
                loading={loading} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg hover:shadow-xl"
              >
                {loading ? 'Menyimpan...' : 'Simpan Buku'}
              </Button>
              <button
                type="button"
                onClick={() => navigate('/books')}
                disabled={loading}
                className="px-6 py-4 border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 disabled:opacity-50 transition-all font-bold"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
