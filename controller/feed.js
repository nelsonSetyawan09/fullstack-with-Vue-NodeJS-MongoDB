const {validationResult} = require('express-validator/check');
const Post = require('../models/post');



exports.getPosts = (req,res,next)=>{
	Post.find()
		.then(posts =>{
			if(!posts){
				const error = new Error('validation failed!!')
				error.statusCode = 422;
				throw error
			};
			res.status(200).json({mesasge: 'fetch all  post',posts});
		})
		.catch(err => {
			if(!err.statusCode){
				err.statusCode = 500;
			};
			// kita tdk menggunakan throw error, krn ini asyncronous,
			//  next(err), akan menuju error handling middleware express
			next(err);
		});
};

exports.getPost = (req, res, next) =>{
	const id = req.params.postId;
	Post.findById(id)
		.then(post =>{
			if(!post){
				const error = new Error('validation failed!!')
				error.statusCode = 422;
				throw error
			};
			res.status(200).json({mesasge: 'found post', post});
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


exports.createPost = (req,res,next) =>{
	const errors = validationResult(req);
	const title = req.body.title;
	const content = req.body.content;

	// jika error, program disini berhenti
	// otomatis try execute the next error handling function in middleware
	if(!errors.isEmpty()){
		const error = new Error('validation failed!!')
		error.statusCode = 422;
		throw error
	};

	let post = new Post({
		title, 
		content,
		imageUrl: 'images/wano.png',
		creator: {name: 'Nelson Setyawan'}
	})
	post.save()
		.then(result =>{
			res.status(201).json({
				mesasge: 'Post created successfully',
				post : result
			})
		})
		.catch(err => {
			if(!err.statusCode){
				err.statusCode = 500;
			};
			// kita tdk menggunakan throw error, krn ini asyncronous,
			//  next(err), akan menuju error handling middleware express
			next(err);
		});	
}