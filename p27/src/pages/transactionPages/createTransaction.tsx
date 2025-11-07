// src/pages/transactionPages/createTransaction.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../api/books';
import { createTransaction } from '../../api/transactions';
import { Book } from '../../types/book.types';

interface CartItem {
  book: Book;
  quantity: number;
}

const CreateTransaction: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBooks({ limit: 100 });
      setBooks(response.data || []);
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (book: Book) => {
    const existingItem = cart.find(item => item.book.id === book.id);
    if (existingItem) {
      // Already in cart, just increment quantity
      updateQuantity(book.id, existingItem.quantity + 1);
    } else {
      // Add new item to cart
      setCart([...cart, { book, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (bookId: number) => {
    setCart(cart.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(bookId);
      return;
    }

    const item = cart.find(item => item.book.id === bookId);
    if (item && newQuantity > item.book.stock) {
      alert(`Cannot exceed available stock (${item.book.stock})`);
      return;
    }

    setCart(cart.map(item =>
      item.book.id === bookId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateSubtotal = (item: CartItem) => {
    return item.book.price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (cart.length === 0) {
      alert('Please add at least one book to your cart');
      return;
    }

    // Check stock availability
    for (const item of cart) {
      if (item.quantity > item.book.stock) {
        alert(`Insufficient stock for "${item.book.title}". Available: ${item.book.stock}`);
        return;
      }
      if (item.quantity < 1) {
        alert('Quantity must be greater than 0');
        return;
      }
    }

    try {
      setSubmitting(true);
      setError(null);

      const transactionData = {
        items: cart.map(item => ({
          book_id: item.book.id,
          quantity: item.quantity
        }))
      };

      const response = await createTransaction(transactionData);

      // Success - redirect to transaction detail or list
      if (response.data?.id) {
        navigate(`/transactions/${response.data.id}`);
      } else {
        navigate('/transactions');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create transaction. Please try again.');
      console.error('Error creating transaction:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.writer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Transaction</h1>
          <p className="mt-2 text-gray-600">Select books and quantities to create a new transaction</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Selection Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Available Books</h2>

              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by title or writer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Books List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredBooks.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No books found</p>
                ) : (
                  filteredBooks.map(book => {
                    const inCart = cart.find(item => item.book.id === book.id);
                    return (
                      <div
                        key={book.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{book.title}</h3>
                            <p className="text-sm text-gray-600">{book.writer}</p>
                            <div className="mt-2 flex items-center gap-4 text-sm">
                              <span className="font-semibold text-blue-600">
                                ${book.price.toLocaleString()}
                              </span>
                              <span className={`${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                Stock: {book.stock}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddToCart(book)}
                            disabled={book.stock === 0 || !!inCart}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                              book.stock === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : inCart
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {book.stock === 0 ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Cart ({cart.length})</h2>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.book.id} className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-2">
                            <h4 className="font-medium text-sm">{item.book.title}</h4>
                            <p className="text-xs text-gray-600">${item.book.price}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.book.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.book.id, parseInt(e.target.value) || 0)}
                              className="w-16 text-center border border-gray-300 rounded py-1"
                              min="1"
                              max={item.book.stock}
                            />
                            <button
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                              disabled={item.quantity >= item.book.stock}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-sm">
                            ${calculateSubtotal(item).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-semibold">{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Price:</span>
                      <span className="text-blue-600">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <button
                      type="submit"
                      disabled={submitting || cart.length === 0}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Processing...' : 'Complete Transaction'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/transactions')}
                      className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;
