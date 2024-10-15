// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/auth/auth.slice';
import commentsSlice from './features/comments/comments.slice';
import postsSlice from './features/posts/posts.slice';
import likesSlice from './features/likes/likes.slice';
import loadingSlice from './features/loading/loading.slice';
import modalSlice from './features/modal/modal.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  likes : likesSlice,
  comments : commentsSlice,
  post : postsSlice,
  loading : loadingSlice,
  modal: modalSlice,
})

export default rootReducer;
