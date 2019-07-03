const express = require('express');
const {body } = require('express-validator/check');

const authController = require('../controller/auth');
const User = require('../models/user');


const router = express.Router();


router.put('/signup',[
	body('email')
		.isEmail()
		.withMessage('Please enter valid email!!')
		.custom((value, {req}) =>{
			return User.findOne({email: value})
				.then(user =>{
					if(user){
						return Promise.reject('email already exist!');
					};
				});
		})
		.normalizeEmail(),
	body('password')
		.trim()
		.isLength({min:6}),
	body('name')
		.trim()
		.isLength({min:4})
], authController.signup);


router.post('/login',authController.login);


module.exports = router;
