const catchAsync = require('../utils/catchAsync')
const User = require('../models/usersModel')
const AppError = require('../utils/appError')
const signToken = require('../utils/signToken')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    const user = await User.create(newUser)
    const token = signToken(user._id)

    res.status(201).json({
        message: 'success',
        token
    })
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body

    if(!email && !password) {
        return next(new AppError('Molimo vas ispunite neophodna polja.', 400))
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !await user.comparePasswords(password, user.password)) {
        return next(new AppError('Netačan email ili lozinka.', 400))
    }

    const token = signToken(user._id)

    res.status(201).json({
        token
    })
})


exports.protectRoutes = catchAsync(async(req, res, next) => {
    // 1) Get the token
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new AppError('Neispravan token.', 401));
    }

    // 2) Get the coresponding user 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id)
    console.log(decoded)

    if(!currentUser) {
        return next(new AppError('Korisnik vezan za ovaj token više ne postoji.', 401))
    }

    // 3) "PUSH" the user through middleware stack / pipeline
    req.user = currentUser
    next()
})