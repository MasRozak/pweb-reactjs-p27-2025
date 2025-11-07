// src/components/ErrorMessage.tsx


interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
      <p className="font-bold">Terjadi Kesalahan</p>
      <p>{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-1.5 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;