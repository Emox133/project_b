const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Polje ne smije biti prazno.']
    },
    content: {
        type: String,
        required: [true, 'Polje ne smije biti prazno.']
    }
})

const Post = mongoose.model('Post', postsSchema)

module.exports = Post