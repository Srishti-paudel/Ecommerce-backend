import express from 'express'
import '../src/database/connection.js'
import authRoute from './route/authRoute.js';
import categoryRoute from './route/categoryRoute.js'

const app= express()
app.use("api/auth",authRoute)
app.use("api/auth",categoryRoute)

export default app