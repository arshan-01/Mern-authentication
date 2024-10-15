// Import all routes here and use them in the app
// routes/index.js
import express from 'express'
import authRoute from './auth.routes.js'

const router = express.Router()

// Define routes
router.use('/auth', authRoute)
// Add other routes here
// router.use('/users', userRoutes);
// router.use('/another', anotherRoutes);

export default router
