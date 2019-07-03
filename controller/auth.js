const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {validationResult} = require('express-validator/check');

const User = require('../models/user');


exports.signup = (req,res,next) =>{
	const errors = validationResult(req);
	// jika error, program disini berhenti
	// otomatis try execute the next error handling function in middleware
	if(!errors.isEmpty()){
		const error = new Error('validation failed!!')
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	};

	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;

	bcrypt.hash(password,12)
		.then(hasPassword =>{
			let newUser = new User({
				name,
				email,
				password: hasPassword
			});
			return newUser.save();
		})
		.then(result =>{
			res.status(201).json({message: 'new user created', userId : result._id});
		})
		.catch(err =>{
			if(!err.statusCode){
				err.statusCode = 500;
			};
			// kita tdk menggunakan throw error, krn ini asyncronous,
			//  next(err), akan menuju error handling middleware express
			next(err);
		});
};

exports.login = (req,res,next) =>{
	const email = req.body.email;
	const password = req.body.password;
	let findUser;

	User.findOne({email})
		.then(user =>{
			if(!user){
				const error = new Error('user not found with this email!!')
				error.statusCode = 401;
				throw error;
			};
			findUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then(isEqual =>{
			if(!isEqual){
				const error = new Error('password not correct with this email!!')
				error.statusCode = 401;
				throw error;
			};
			
			// if success, make token
			const token = jwt.sign(
				{email: findUser.email, userId : findUser._id.toString()},
				'moliSecret',	// sebagai secret,yg digunakan untuk decoded,
				{expiresIn: '1h'}
				);

			res.status(200).json({token, userId:  findUser._id.toString()});
		})
		.catch(err =>{
			if(!err.statusCode){
				err.statusCode = 500;
			};
			// kita tdk menggunakan throw error, krn ini asyncronous,
			//  next(err), akan menuju error handling middleware express
			next(err);
		})
};