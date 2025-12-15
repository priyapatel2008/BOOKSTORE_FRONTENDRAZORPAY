import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const paymentService = {
  createOrder: (data) => axiosInstance.post('/payments/create-order', data),
  verifyPayment: (data) => axiosInstance.post('/payments/verify', data),
  getAll: () => axiosInstance.get('/payments'),
  getById: (id) => axiosInstance.get(`/payments/${id}`),
  getUserPayments: (userId) => axiosInstance.get(`/payments/user/${userId}`),
};

export default axiosInstance;
