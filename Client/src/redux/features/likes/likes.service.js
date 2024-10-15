import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import { AuthenticatedAPI } from '../../../utils/Api';

// Toggle like on a post
export const toggleLike = createAsyncThunk('likes/toggleLike', async (likeData, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.post(config.endPoints.toggleLike, likeData), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});

// Get likes by post ID
export const getLikesByPostId = createAsyncThunk('likes/getLikesByPostId', async (postId, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.get(`${config.endPoints.getLikesByPostId}/${postId}`), {
    showSuccessToast: false,
    showErrorToast: true,
  }, rejectWithValue);
});
