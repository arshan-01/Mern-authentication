import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',  // Reference the Role model
    }],
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }, // For email verification
    accessToken: { type: String }, // Field to store refresh token
    // Password reset fields
    resetPasswordToken: {
      type: String,
      default: null, // Token for password reset
    },
    resetPasswordTokenExpires: {
      type: Date,
      default: null, // Expiration time for the reset token
    },
    // Email verification fields
    emailVerificationToken: {
      type: String,
      default: null, // Token for email verification
    },
    emailVerificationTokenExpires: {
      type: Date,
      default: null, // Expiration time for the verification token
    },
    joinedAt: { type: Date, default: Date.now },
    // mfaEnabled: { type: Boolean, default: false },
    // mfaSecret: { type: String }, // Store the MFA secret for the user
  },
  { timestamps: true }
);

// Pre-save middleware for hashing the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Adding a pre-save hook to assign the default role
// userSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     // Find the role document for 'author'
//     const authorRole = await Role.findOne({ name: 'author' });
//     if (authorRole) {
//       this.roles.push(authorRole._id); // Add the author role to the user
//     } else {
//       next(new ApiError(400, 'Default role not found.'));
//     }
//   }
//   next();
// });

const User = model('User', userSchema);
export default User;
