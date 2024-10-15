import { ApiError, asyncHandler } from '../utils/api.utils.js';
import User from '../models/user.model.js';
import { verifyToken } from '../utils/token.utils.js';
import { JWT_ACCESS_SECRET } from '../config/env.config.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new ApiError(401, 'Unauthorized request');
        }

        // Verify the accessToken
        const decodedToken = verifyToken(token, JWT_ACCESS_SECRET);

        // If the token is valid, proceed with the request
        const user = await User.findById(decodedToken?.id).select('-password -refreshToken');
        if (!user) {
            throw new ApiError(401, 'Invalid Access Token');
        }

        req.user = user; // Attach the user to the request object for further use
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'Unauthorized request');
    }
});
