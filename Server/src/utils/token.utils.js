// utils/token.utils.js
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from '../config/env.config.js';


// Function to generate access tokens
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });
};

// Function to generate refresh tokens
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

// Function to generate a token for email verification or password reset
export const generateVerificationToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_ACCESS_SECRET, { expiresIn: '1h' });
};

// Middleware to verify tokens
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

