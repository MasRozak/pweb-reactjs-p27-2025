// src/pages/transactionPages/detailTransaction.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

// Types matching the actual API structure
interface TransactionItem {
  book_id: string;
  book_title?: string;
  quantity: number;
  price?: number;
  subtotal_price?: number;
}

interface TransactionDetail {
  id: string;
  user_id?: string;
  user_email?: string;
  total_quantity: number;
  total_price: number;
  created_at: string;
  items: TransactionItem[];
}

const DetailTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<TransactionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransaction = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/transactions/${id}`);
      setTransaction(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load transaction details. Please try again.');
      console.error('Error loading transaction:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadTransaction();
    }
  }, [id, loadTransaction]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Error Loading Transaction</h2>
            <p>{error || 'Transaction not found'}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={loadTransaction}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Retry
              </button>
              <button
                onClick={() => navigate('/transactions')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/transactions')}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Transactions
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
        </div>

        {/* Transaction Info Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-blue-600 text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Transaction ID</p>
                <p className="text-2xl font-bold">#{transaction.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Date & Time</p>
                <p className="text-lg font-semibold">{formatDate(transaction.created_at)}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transaction.user_email && (
                <div>
                  <p className="text-sm text-gray-600">Customer Email</p>
                  <p className="text-lg font-medium text-gray-900">{transaction.user_email}</p>
                </div>
              )}
              {transaction.user_id && (
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="text-lg font-medium text-gray-900">#{transaction.user_id}</p>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{transaction.total_quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-2xl font-bold text-blue-600">${transaction.total_price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Items Purchased</h2>
          </div>

          {transaction.items && transaction.items.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book Title
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price per Item
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transaction.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.book_title || `Book ID: ${item.book_id}`}
                          </div>
                          <div className="text-xs text-gray-500">ID: {item.book_id}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-gray-900 font-semibold">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm text-gray-900">
                            {item.price ? `$${item.price.toLocaleString()}` : 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-900">
                            ${(item.subtotal_price || 0).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Grand Total:
                      </td>
                      <td className="px-6 py-4 text-right text-lg font-bold text-blue-600">
                        ${transaction.total_price.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {transaction.items.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="font-medium text-gray-900 mb-2">
                      {item.book_title || `Book ID: ${item.book_id}`}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <span className="ml-2 font-semibold">{item.quantity}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600">Price:</span>
                        <span className="ml-2 font-semibold">
                          {item.price ? `$${item.price.toLocaleString()}` : 'N/A'}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="ml-2 font-bold text-blue-600">
                          ${(item.subtotal_price || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Grand Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${transaction.total_price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No items found for this transaction.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/transactions')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Transactions
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaction;
