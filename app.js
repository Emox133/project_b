const express = require('express')
const usersRouter = require('./routes/usersRouter')
const postsRouter = require('./routes/postsRouter')
const globalErrorHandler = require('./controllers/errorController')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/posts', postsRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({
        message: `The requested route ${req.originalUrl} is not found.`
    })
}); 

app.use(globalErrorHandler)

module.exports = app