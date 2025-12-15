import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import Alert from '../components/Alert';

const AddBook = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const handleSuccess = (book) => {
    setAlert({
      type: 'success',
      message: `Book "${book.title}" added successfully!`,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleError = (error) => {
    setAlert({
      type: 'error',
      message: error,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {alert && (
        <div className="mb-6">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          ← Back to Books
        </button>
      </div>

      <BookForm onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default AddBook;
