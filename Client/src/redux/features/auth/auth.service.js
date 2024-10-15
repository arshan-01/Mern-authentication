import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import { AuthenticatedAPI, PublicAPI } from '../../../utils/Api';

// Authentication Thunks

// Register a new user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  return handleResponse(PublicAPI.post(config.endPoints.register, userData), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// User login
export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
  return handleResponse(PublicAPI.post(config.endPoints.login, loginData), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// Reset password
export const resetPasswordLink = createAsyncThunk('auth/resetPasswordLink', async (email, { rejectWithValue }) => {
  return handleResponse(PublicAPI.post(config.endPoints.resetPasswordLink, email ), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// Update password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (passwordData, { rejectWithValue }) => {
  return handleResponse(PublicAPI.patch(config.endPoints.resetPassword, passwordData), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// Verify email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ token, id }, { rejectWithValue }) => {
    return handleResponse(PublicAPI.post(`${config.endPoints.verifyEmail}?id=${id}`, { token }), {
      showSuccessToast: false,
      showErrorToast: false
    }, rejectWithValue);
  }
);

// Resend verification email
export const resendVerificationEmail = createAsyncThunk('auth/resendVerificationEmail', async (UserId, { rejectWithValue }) => {
  return handleResponse(PublicAPI.post(config.endPoints.resendVerificationEmail, UserId ), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.post(config.endPoints.logout), {
    showSuccessToast: true,
    showErrorToast: false   // No error toast for logout failure
  }, rejectWithValue);
});

// Refresh token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.post(config.endPoints.refreshToken), {
    showSuccessToast: false,
    showErrorToast: true
  }, rejectWithValue);
});

// Get user profile
export const getMyProfile = createAsyncThunk('auth/getMyProfile', async (_, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.get(config.endPoints.myProfile), {
    showSuccessToast: false,
    showErrorToast: true
  }, rejectWithValue);
});

// Update profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.patch(config.endPoints.updateProfile, profileData), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// Change password
export const updatePassword = createAsyncThunk('auth/updatePassword', async (passwordData, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.post(config.endPoints.changePassword, passwordData), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});

// Send password reset email
export const sendPasswordResetEmail = createAsyncThunk('auth/sendPasswordResetEmail', async (email, { rejectWithValue }) => {
  return handleResponse(PublicAPI.post(config.endPoints.sendPasswordResetEmail, { email }), {
    showSuccessToast: true,
    showErrorToast: true
  }, rejectWithValue);
});
