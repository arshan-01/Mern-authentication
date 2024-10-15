import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import { AuthenticatedAPI } from '../../../utils/Api';

// Create a comment
export const createComment = createAsyncThunk('comments/createComment', async (commentData, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.post(config.endPoints.createComment, commentData), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});

// Get comments by post ID
export const getCommentsByPostId = createAsyncThunk('comments/getCommentsByPostId', async (postId, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.get(`${config.endPoints.getCommentsByPostId}/${postId}`), {
    showSuccessToast: false,
    showErrorToast: true,
  }, rejectWithValue);
});

// Update comment by ID
export const updateCommentById = createAsyncThunk('comments/updateCommentById', async ({ commentId, commentData }, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.patch(`${config.endPoints.updateCommentById}/${commentId}`, commentData), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});

// Delete comment by ID
export const deleteCommentById = createAsyncThunk('comments/deleteCommentById', async (commentId, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.delete(`${config.endPoints.deleteCommentById}/${commentId}`), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});

// Flag a comment
export const flagComment = createAsyncThunk('comments/flagComment', async (commentId, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.patch(`${config.endPoints.flagComment}/${commentId}`, {}), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});
