import React from 'react';

const BookCard = ({ book, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {book.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">₹{book.price}</span>
          <button
            onClick={() => onSelect(book)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
