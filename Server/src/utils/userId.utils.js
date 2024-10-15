import { USER_ID_ENCRYPTION_SECRET } from '../config/env.config.js'; // Ensure the correct import
import crypto from 'crypto';

// Ensure the key is 32 bytes
const keyBuffer = Buffer.from(USER_ID_ENCRYPTION_SECRET, 'hex');

// Function to encrypt user ID
export const encryptUserId = (userId) => {
  const iv = crypto.randomBytes(16); // Generate a random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
  let encryptedId = cipher.update(userId, 'utf8', 'hex');
  encryptedId += cipher.final('hex');

  // Return IV and encrypted ID in a single string (IV:EncryptedId)
  return iv.toString('hex') + ':' + encryptedId;
};

// Function to decrypt user ID
export const decryptUserId = (encryptedData) => {
  const parts = encryptedData.split(':'); // Split the IV and encrypted data
  const iv = Buffer.from(parts.shift(), 'hex'); // Get the IV
  const encryptedId = parts.join(':'); // Join the rest as encrypted ID

  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
  let decryptedId = decipher.update(encryptedId, 'hex', 'utf8');
  decryptedId += decipher.final('utf8');
  
  return decryptedId;
}; 
