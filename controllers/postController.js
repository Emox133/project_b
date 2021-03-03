const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Post = require('../models/postsModel')

exports.getAllPosts = catchAsync(async(req, res, next) => {
    const posts = await Post.find()

    if(!posts) {
        return next(new AppError('Nijedna objava nije pronađena.', 404))
    }

    res.status(200).json({
        message: 'success',
        posts
    })
})

exports.createPosts = catchAsync(async (req, res, next) => {
    const newPost = {
        subject: req.body.subject,
        content: eval(req.body.content)
    }

    const preventXss = ['<script>', '<', 'alert', '>']

    // if(newPost.subject === '<script>' || newPost.subject === '<' || newPost.subject === '>') {
    //     return next(new AppError('XSS nije dozvoljen na ovom inputu.', 403))
    // }

    preventXss.forEach(el => {
        if(newPost.subject.includes(el)) {
            return next(new AppError('XSS nije dozvoljen na subject inputu.', 403))
        }
    })

    

    if(!newPost.subject || !newPost.content) {
        return next(new AppError('Polje ne smije biti prazno.', 403))
    }

    await Post.create(newPost)

    res.status(201).json({
        message: 'success'
    })
})