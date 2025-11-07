// src/pages/bookPages/testAPI.tsx
import { useState } from 'react';
import { getBooks } from '../../api/books';
import { getGenres } from '../../api/genres';
import { getToken } from '../../utils/token';

const TestAPI = () => {
  const [booksResponse, setBooksResponse] = useState<any>(null);
  const [genresResponse, setGenresResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const checkToken = () => {
    const t = getToken();
    setToken(t);
    console.log('Token from localStorage:', t);
  };

  const testBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Testing books API...');
      const response = await getBooks({ page: 1, limit: 10 });
      console.log('Books API Response:', response);
      setBooksResponse(response);
    } catch (err: any) {
      console.error('Books API Error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(errorMsg);
      setBooksResponse({ error: errorMsg, details: err.response?.data });
    } finally {
      setLoading(false);
    }
  };

  const testGenres = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Testing genres API...');
      const response = await getGenres();
      console.log('Genres API Response:', response);
      setGenresResponse(response);
    } catch (err: any) {
      console.error('Genres API Error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(errorMsg);
      setGenresResponse({ error: errorMsg, details: err.response?.data });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold mb-2">Auth Token Check:</h3>
        <button
          onClick={checkToken}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mb-2"
        >
          Check Token
        </button>
        {token !== null && (
          <div className="mt-2">
            <p className="text-sm">Token: {token || '(No token found)'}</p>
          </div>
        )}
      </div>

      <div className="space-x-4 mb-6">
        <button
          onClick={testBooks}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Books API
        </button>
        <button
          onClick={testGenres}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Genres API
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded mb-4">
          <p className="text-red-600 font-bold">Error: {error}</p>
        </div>
      )}

      {booksResponse && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Books Response:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
            {JSON.stringify(booksResponse, null, 2)}
          </pre>
        </div>
      )}

      {genresResponse && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Genres Response:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
            {JSON.stringify(genresResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestAPI;
