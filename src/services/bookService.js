import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Safety check (can remove later)
if (!API_URL) {
  console.error("❌ VITE_API_URL is undefined. Check your .env file");
}

export const bookService = {
  getAll: () => axios.get(`${API_URL}/books`),
  getById: (id) => axios.get(`${API_URL}/books/${id}`),
  create: (data) => axios.post(`${API_URL}/books`, data),
  update: (id, data) => axios.put(`${API_URL}/books/${id}`, data),
  remove: (id) => axios.delete(`${API_URL}/books/${id}`),
};
