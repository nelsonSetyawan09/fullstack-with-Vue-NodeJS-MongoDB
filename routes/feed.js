const express = require('express');
const feedController = require('../controller/feed');
const { check, body } = require('express-validator/check');

const router = express.Router();



router.get('/posts', feedController.getPosts)

router.get('/post/:postId', feedController.getPost)

// we don't need validate image, because done with multer
router.post('/post', [
		body('title')
			.trim()
			.isLength({min: 5}),
		body('content')
			.trim()
			.isLength({min: 5})
	],
	feedController.createPost);


router.put('/post/:postId',[
		body('title')
			.trim()
			.isLength({min: 5}),
		body('content')
			.trim()
			.isLength({min: 5})
	],
	feedController.updatePost);

router.delete('/post/:postId',feedController.deletePost)

module.exports = router;