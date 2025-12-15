import React from 'react';
import { useForm } from 'react-hook-form';
import { paymentService } from '../services/paymentService';
import { useRazorpay } from '../hooks/useRazorpay';

const PaymentForm = ({ book, onPaymentSuccess, onPaymentError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      contact: '',
      userId: 'user123',
    },
  });

  const { handlePayment } = useRazorpay();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create order
      const orderResponse = await paymentService.createOrder({
        amount: book.price,
        bookId: book._id,
        email: data.email,
        contact: data.contact,
        userId: data.userId,
      });

      const { orderId, data: orderData } = orderResponse.data;

      // Razorpay payment options
      const paymentOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Book Store',
        description: `Purchase of ${book.title}`,
        order_id: orderId,
        prefill: {
          name: data.name || 'Customer',
          email: data.email,
          contact: data.contact,
        },
      };

      // Handle payment
      const paymentResponse = await handlePayment(paymentOptions);

      // Verify payment
      const verifyResponse = await paymentService.verifyPayment({
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpaySignature: paymentResponse.razorpay_signature,
      });

      if (verifyResponse.data.success) {
        onPaymentSuccess(verifyResponse.data.data);
        reset();
      }
    } catch (error) {
      onPaymentError(error.message);
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complete Purchase</h2>
      <div className="mb-4 pb-4 border-b">
        <p className="text-gray-700">Book: <span className="font-semibold">{book.title}</span></p>
        <p className="text-gray-700">Price: <span className="font-semibold">₹{book.price}</span></p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            {...register('contact', {
              required: 'Contact number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Contact number must be 10 digits',
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.contact ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="9876543210"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold transition duration-200"
        >
          {loading ? 'Processing...' : `Pay ₹${book.price}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
