const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({
    path: './config.env'
})

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => {
    console.log('DB connection successfull')
})

const PORT = process.env.PORT || 6000

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})