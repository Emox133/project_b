const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({
    path: '../config.env'
})

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });
};
  
module.exports = signToken