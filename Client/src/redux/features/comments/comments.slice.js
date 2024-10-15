// src/redux/features/comments/comments.slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getCommentsByPostId,
  updateCommentById,
  deleteCommentById,
  flagComment,
} from './comments.service';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCommentById.fulfilled, (state, action) => {
        const index = state.comments.findIndex((comment) => comment._id === action.payload._id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.comments = state.comments.filter((comment) => comment._id !== action.payload._id);
      })
      .addCase(flagComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex((comment) => comment._id === action.payload._id);
        if (index !== -1) {
          state.comments[index] = { ...state.comments[index], flagged: true };
        }
      });
  },
});

export default commentsSlice.reducer;
