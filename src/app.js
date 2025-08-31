import express from 'express'
import '../src/database/connection.js'
import authRoute from './route/authRoute.js';
import categoryRoute from './route/categoryRoute.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoute)
app.use("/api/category", categoryRoute)

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running!' })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message)
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

export default app