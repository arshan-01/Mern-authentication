import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import { AuthenticatedAPI } from '../../../utils/Api';

// Create a post
export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.post(config.endPoints.createPost, postData), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});

// Get all posts
export const getAllPosts = createAsyncThunk('posts/getAllPosts', async (_, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.get(config.endPoints.getAllPosts), {
    showSuccessToast: false,
    showErrorToast: true,
  }, rejectWithValue);
});

// Get post by ID
export const getPostById = createAsyncThunk('posts/getPostById', async (postId, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.get(`${config.endPoints.getPostById}/${postId}`), {
    showSuccessToast: false,
    showErrorToast: true,
  }, rejectWithValue);
});

// Update post by ID
export const updatePostById = createAsyncThunk('posts/updatePostById', async ({ postId, postData }, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.patch(`${config.endPoints.updatePostById}/${postId}`, postData), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});

// Delete post by ID
export const deletePostById = createAsyncThunk('posts/deletePostById', async (postId, { rejectWithValue }) => {
  return handleResponse(AuthenticatedAPI.delete(`${config.endPoints.deletePostById}/${postId}`), {
    showSuccessToast: true,
    showErrorToast: true,
  }, rejectWithValue);
});
