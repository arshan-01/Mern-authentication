// src/models/refreshToken.model.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Define the refresh token schema
const refreshTokenSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d', // Automatically delete the token after 30 days
  },
});

// Create the RefreshToken model
const RefreshToken = model('RefreshToken', refreshTokenSchema);

export default RefreshToken;


