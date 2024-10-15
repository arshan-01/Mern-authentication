import express from 'express';
import {
  RegisterUser,
  LoginUser,
  resetPasswordLink,
  UpdatePassword,
  VerifyEmail,
  LogoutUser,
  RefreshUserToken,
  resetPassword,
  ResendVerificationEmail,
} from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"  # Example value for fullName
 *               username:
 *                 type: string
 *                 example: "johndoe123"  # Example value for username
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"  # Example value for email
 *               password:
 *                 type: string
 *                 example: "Pa$$w0rd!"  # Example value for password
 *               isVerified:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', RegisterUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"  # Example value for email
 *               password:
 *                 type: string
 *                 example: "Pa$$w0rd!"  # Example value for password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', LoginUser);

/**
 * @swagger
 * /auth/reset-password-link:
 *   post:
 *     summary: Request password reset link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"  # Example email for reset link
 *     responses:
 *       200:
 *         description: Reset password token sent
 *       400:
 *         description: User not found
 */
router.post('/reset-password-link', resetPasswordLink);

/**
 * @swagger
 * /auth/reset-password:
 *   patch:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: "abcdef123456"  # Example reset token
 *               password:
 *                 type: string
 *                 example: "NewPa$$w0rd!"  # Example new password
 *               confirmPassword:
 *                 type: string
 *                 example: "NewPa$$w0rd!"  # Example confirm password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: All fields are required or passwords do not match
 *       404:
 *         description: User not found or invalid/expired reset token
 */
router.patch('/reset-password', resetPassword);

/**
 * @swagger
 * /auth/update-password:
 *   patch:
 *     summary: Update password after login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password.
 *               newPassword:
 *                 type: string
 *                 description: The new password the user wants to set.
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid or expired token, or password mismatch
 */
router.patch('/update-password', UpdatePassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: No refresh token provided
 */
router.post('/logout', LogoutUser);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify user email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "verificationToken123"  # Example verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired verification token
 */
router.post('/verify-email', VerifyEmail);

/**
 * @swagger
 * /auth/resend-email-verification:
 *   post:
 *     summary: Resend verification email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"  # Example email
 *     responses:
 *       200:
 *         description: Verification email resent
 *       400:
 *         description: Invalid email or user already verified
 */
router.post('/resend-email-verification', ResendVerificationEmail);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "refreshToken123"  # Example refresh token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: No refresh token provided or invalid refresh token
 */
router.post('/refresh-token', RefreshUserToken);

export default router;
