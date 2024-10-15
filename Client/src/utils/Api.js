// src/utils/api.js
import axios from 'axios';
import { config } from './EndPoints';

// Create the main Axios instance for authenticated requests
export const AuthenticatedAPI = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,  // This ensures cookies (like refreshToken) are sent with requests
});

// Create a public Axios instance for requests that don't require authentication
export const PublicAPI = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,  // This ensures cookies are sent with requests
});

// Add a response interceptor to handle token expiration for authenticated requests
AuthenticatedAPI.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for unauthorized (401) response to attempt token refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        // Send request to refresh the token using the refresh token (sent in cookies)
        await PublicAPI.post('/refresh-token', {}, { withCredentials: true });
        
        // Retry the original request without setting the Authorization header
        return AuthenticatedAPI(originalRequest);
      } catch (tokenRefreshError) {
        // Handle refresh failure (e.g., redirect to login)
        return Promise.reject(tokenRefreshError);
      }
    }

    // Reject the promise with the original error if not handled
    return Promise.reject(error);
  }
);
