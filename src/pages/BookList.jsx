import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Alert from '../components/Alert';
import { bookService } from '../services/bookService';

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getAll();
        setBooks(response.data.data);
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to load books. Make sure the backend is running.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSelectBook = (book) => {
    navigate(`/book/${book._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading books...</div>
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

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No books available. Please add some books first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onSelect={handleSelectBook}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
