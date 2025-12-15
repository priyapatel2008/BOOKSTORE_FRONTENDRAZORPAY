import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import Alert from '../components/Alert';
import { bookService } from '../services/bookService';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookService.getById(id);
        setBook(response.data.data);
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to load book details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handlePaymentSuccess = (paymentData) => {
    setAlert({
      type: 'success',
      message: 'Payment successful! Order placed.',
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handlePaymentError = (error) => {
    setAlert({
      type: 'error',
      message: `Payment failed: ${error}`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          type="error"
          message="Book not found"
          onClose={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {alert && (
        <div className="mb-4">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-500 hover:text-blue-700 font-semibold"
      >
        ← Back to Books
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={book.image}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg mb-4">by {book.author}</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm">Category</p>
                <p className="font-semibold">{book.category}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Publisher</p>
                <p className="font-semibold">{book.publisher}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Pages</p>
                <p className="font-semibold">{book.pages}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Language</p>
                <p className="font-semibold">{book.language}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {book.description}
          </p>

          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <p className="text-4xl font-bold text-green-600">₹{book.price}</p>
            <p className="text-gray-600 text-sm">Price</p>
          </div>

          <PaymentForm
            book={book}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
