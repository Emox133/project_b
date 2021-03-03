const express = require('express')
const authController = require('../controllers/authController')
const postsController = require('../controllers/postController')

const router = express.Router()

router.route('/').post(authController.protectRoutes, postsController.createPosts)
router.route('/').get(authController.protectRoutes, postsController.getAllPosts)

module.exports = router