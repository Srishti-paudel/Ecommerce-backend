import app from "./src/app.js";
import { envConfig } from "./src/config/config.js";
// adminSeeder()

const PORT = envConfig.port || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server started at port [${PORT}]`)
})

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`)
    } else {
        console.error('Server error:', error)
    }
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
    // Don't exit immediately, give time for cleanup
    setTimeout(() => {
        process.exit(1)
    }, 1000)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    // Don't exit immediately, give time for cleanup
    setTimeout(() => {
        process.exit(1)
    }, 1000)
}) 