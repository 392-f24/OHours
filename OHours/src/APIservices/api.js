import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: '/api', // This will be prepended to all API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  // You can add auth tokens here if needed
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response.data;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(error);
});

export default api;