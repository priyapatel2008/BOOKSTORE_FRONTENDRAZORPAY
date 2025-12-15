import React from 'react';
import { useForm } from 'react-hook-form';
import { bookService } from '../services/bookService';

const BookForm = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      description: '',
      price: '',
      ISBN: '',
      publisher: '',
      category: 'Fiction',
      pages: '',
      language: 'English',
      stock: '',
      rating: 0,
      image: '',
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const bookData = {
        ...data,
        price: parseFloat(data.price),
        pages: parseInt(data.pages) || 0,
        stock: parseInt(data.stock) || 0,
        rating: parseFloat(data.rating) || 0,
      };

      const response = await bookService.create(bookData);
      if (response.data.success) {
        onSuccess(response.data.data);
        reset();
      }
    } catch (error) {
      onError(error.response?.data?.message || 'Error creating book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Book title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              type="text"
              {...register('author', { required: 'Author is required' })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              {...register('ISBN')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ISBN number"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publisher
            </label>
            <input
              type="text"
              {...register('publisher')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Publisher name"
            />
          </div>

          {/* Pages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pages
            </label>
            <input
              type="number"
              {...register('pages', {
                min: { value: 0, message: 'Pages must be positive' },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.pages ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Number of pages"
            />
            {errors.pages && (
              <p className="text-red-500 text-sm mt-1">{errors.pages.message}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <input
              type="text"
              {...register('language')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., English"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              {...register('stock', {
                min: { value: 0, message: 'Stock must be positive' },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (0-5)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('rating', {
                min: { value: 0, message: 'Rating minimum is 0' },
                max: { value: 5, message: 'Rating maximum is 5' },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.rating ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Book description"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            {...register('image')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold transition duration-200"
          >
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>
          <button
            type="reset"
            onClick={() => reset()}
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
