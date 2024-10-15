// src/redux/features/likes/likes.slice.js
import { createSlice } from '@reduxjs/toolkit';
import { toggleLike, getLikesByPostId } from './likes.service';

const initialState = {
  likes: [],
  loading: false,
  error: null,
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.loading = false;
        const likeIndex = state.likes.findIndex((like) => like._id === action.payload._id);
        if (likeIndex !== -1) {
          state.likes[likeIndex] = action.payload;
        } else {
          state.likes.push(action.payload);
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLikesByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikesByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;
      })
      .addCase(getLikesByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default likesSlice.reducer;
