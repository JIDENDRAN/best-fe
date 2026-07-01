// src/apiConfig.js

/**
 * The base URL for the backend API.
 * Uses an environment variable in production, falls back to localhost for development.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default API_BASE_URL;
