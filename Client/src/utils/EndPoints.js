// src/utils/EndPoints.js
const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL,

  endPoints: {
    // Authentication Endpoints
    register: 'auth/register',
    login: 'auth/login',
    resetPasswordLink: 'auth/reset-password-link',
    resetPassword: 'auth/reset-password',
    updatePassword: 'auth/update-password',
    verifyEmail: 'auth/verify-email',
    resendVerificationEmail: 'auth/resend-email-verfication',
    logout: 'auth/logout',
    refreshToken: 'refresh-token',

    // Profile Management
    myProfile: 'auth/myProfile',
    updateProfile: 'auth/updateProfile',
    changePassword: 'auth/changePassword',

    // Comments API
    createComment: 'comment/create',
    getCommentsByPostId:  'comment/get-comments',
    updateCommentById:  'comment/update',
    deleteCommentById:  'comment/delete',
    flagComment: 'comment/flag',

    // Likes API
    toggleLike: 'like/toggle-like',
    getLikesByPostId: 'like/get-likes',

    // Posts API
    createPost: 'post/create',
    getAllPosts: 'post/all',
    getPostById:  'post/get-post',
    updatePostById: 'post/update',
    deletePostById: 'post/delete',
  },
};

export { config };

  