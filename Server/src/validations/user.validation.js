import Joi from 'joi';

// Register User Validation
export const registerUser = Joi.object({
    fullName: Joi.string().required().messages({
        'string.empty': 'Full name is required.',
        'any.required': 'Full name is required.',
    }),
    username: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Username is required.',
            'string.min': 'Username must be at least 6 characters long.',
            'string.max': 'Username must be at most 30 characters long.',
            'any.required': 'Username is required.',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.',
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must be at most 30 characters long.',
            'any.required': 'Password is required.',
        }),
    isDeleted: Joi.boolean(),
    isVerified: Joi.boolean(),
    accessToken: Joi.string().allow(null, ''),
    resetPasswordToken: Joi.string().allow(null, ''),
    resetPasswordTokenExpires: Joi.date().allow(null),
    emailVerificationToken: Joi.string().allow(null, ''),
    emailVerificationTokenExpires: Joi.date().allow(null),
    joinedAt: Joi.date().default(() => new Date()), // Automatically set to current date if not provided
});

// Login Validation
export const loginUser = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required.',
            'any.required': 'Password is required.',
        }),
});

// Password Reset Email Validation
export const resetPasswordEmail = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.',
        }),
});

// Password Reset Validation
export const ResetPassword = Joi.object({
    resettoken: Joi.string()
    .required()
    .messages({ 
                'string.empty': 'A valid reset token is required to proceed with password recovery.', 
                'any.required': 'A valid reset token is required to proceed with password recovery.', }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must be at most 30 characters long.',
            'any.required': 'Password is required.',
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'string.empty': 'Confirm password is required.',
            'any.required': 'Confirm password is required.',
            'any.only': 'Passwords must match.',
        }),
});

export const PasswordUpdate = Joi.object({
    currentPassword: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Current password is required.',
            'any.required': 'Current password is required.',
        }),
        newPassword: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'New password is required.',
            'string.min': 'New Password must be at least 6 characters long.',
            'string.max': 'New Password must be at most 30 characters long.',
            'any.required': 'New Password is required.',
        }),

});