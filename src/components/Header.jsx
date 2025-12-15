import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">📚 Book Store</h1>
          <p className="text-blue-100">Buy books with Razorpay payment</p>
        </div>
        <Link
          to="/add-book"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
        >
          + Add Book
        </Link>
      </div>
    </header>
  );
};

export default Header;
