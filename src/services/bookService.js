import axios from "axios";

// ✅ Base URL from Vite env (must include /api)
const API_URL = import.meta.env.VITE_API_URL; 
// Example: https://bookstore-backendrazorpay.onrender.com/api

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Book service API calls
export const bookService = {
  // Get all books → calls: <API_URL>/books
  getAll: () => axiosInstance.get("/books"),

  // Get a single book by id → <API_URL>/books/:id
  getById: (id) => axiosInstance.get(`/books/${id}`),

  // Create a new book → POST <API_URL>/books
  create: (data) => axiosInstance.post("/books", data),

  // Update a book → PUT <API_URL>/books/:id
  update: (id, data) => axiosInstance.put(`/books/${id}`, data),

  // Delete a book → DELETE <API_URL>/books/:id
  delete: (id) => axiosInstance.delete(`/books/${id}`),
};

export default axiosInstance;
