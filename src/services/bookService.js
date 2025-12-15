import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const bookService = {
  getAll: () => axiosInstance.get('/books'),
  getById: (id) => axiosInstance.get(`/books/${id}`),
  create: (data) => axiosInstance.post('/books', data),
  update: (id, data) => axiosInstance.put(`/books/${id}`, data),
  delete: (id) => axiosInstance.delete(`/books/${id}`),
};

export default axiosInstance;
