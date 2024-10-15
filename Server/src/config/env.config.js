// Load environment variables
import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})
// Define environment variables
 
const { DB_NAME, NODE_ENV, MONGODB_URI, SERVER_URL, PASS_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, PORT, EMAIL, PASSWORD, CLIENT_URL, USER_ID_ENCRYPTION_SECRET } = process.env

// Define Swagger stage URL based on environment
const SWAGGER_STAGE_URL = NODE_ENV === 'production' ? SERVER_URL : `http://localhost:${PORT}`

// Cors origin
// Cors origin: Define ALLOWED_ORIGINS as an array
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
// Export environment variables
export { DB_NAME, NODE_ENV, MONGODB_URI, PASS_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, PORT, EMAIL, PASSWORD, ALLOWED_ORIGINS, CLIENT_URL, SWAGGER_STAGE_URL, USER_ID_ENCRYPTION_SECRET }
