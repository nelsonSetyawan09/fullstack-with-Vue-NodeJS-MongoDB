const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator/check');
const Post = require('../models/post');


// helper function delete file image

const clearImage = (filePath) =>{
	let filePathDelete= path.join(__dirname, '..', filePath);
	fs.unlink(filePathDelete, err => {
		if(err) {
			console.log('error delete iamge',err);
		};
	});
};

exports.getPosts = (req,res,next)=>{
	const perPage=3;
	let currentPage = req.query.page || 1;
	let totalItems=0;

	Post.find()
		.countDocuments()
		.then(counts =>{
			totalItems = counts;
			return Post.find()
				.skip((currentPage-1)*perPage) // berapa bnyk documents yg di-skip
				.limit(perPage)
		})
		.then(posts =>{
			if(!posts){
				const error = new Error('validation failed!!')
				error.statusCode = 422;
				throw error
			};
			res.status(200).json({
				message: 'fetch all  post',
				posts,
				totalItems,
				perPage
			});
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


exports.getPost = (req, res, next) =>{
	const id = req.params.postId;
	Post.findById(id)
		.then(post =>{
			if(!post){
				const error = new Error('not found post!!')
				error.statusCode = 422;
				throw error
			};
			res.status(200).json({message: 'found post', post});
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

	// jika error, program disini berhenti
	// otomatis try execute the next error handling function in middleware
	if(!errors.isEmpty()){
		const error = new Error('validation failed!!')
		error.statusCode = 422;
		throw error
	};

	if(!req.file){
		const error = new Error('not image upload!!')
		error.statusCode = 422;
		throw error		
	}

	const title = req.body.title;
	const content = req.body.content;
	const imageUrl = req.file.path;	// came from multer feature
	let post = new Post({
		title, 
		content,
		imageUrl,
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
};

exports.updatePost = (req,res,next)=>{
	const postId = req.params.postId;

	const errors = validationResult(req);
	// jika error, program disini berhenti
	// otomatis try execute the next error handling function in middleware
	if(!errors.isEmpty()){
		const error = new Error('validation failed!!')
		error.statusCode = 422;
		throw error
	};

	const title = req.body.title;
	const content = req.body.content;
	
	let imageUrl = req.body.image;
	console.log('req.body.image', imageUrl);	//undefined

	
	if(req.file){
		imageUrl = req.file.path;
		console.log(' req.file.path', imageUrl); // images/2019-06-16T07:59:30.176Z-traditional_super_methods.png
	};

	if(!imageUrl){
		const error = new Error('not file image upload!!');
		error.statusCode = 422;
		throw error;	
	};

	Post.findById(postId)
		.then(post =>{
			if(!post){
				const error = new Error('not found post!!');
				error.statusCode = 422;
				throw error;
			};

			if(imageUrl !== post.imageUrl){
				clearImage(post.imageUrl)
			};

			post.title = title;
			post.content = content;
			post.imageUrl = imageUrl;
			return post.save();
		})
		.then(result =>{
			res.status(200).json({message: 'found post', post:result});
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

exports.deletePost = (req,res,next) =>{
	const postId = req.params.postId;

	Post.findById(postId)
		.then(post =>{
			if(!post){
				const error = new Error('not found post!!');
				error.statusCode = 422;
				throw error;
			};
			clearImage(post.imageUrl);
			return Post.findByIdAndRemove(postId)
		})
		.then(result =>{
			console.log('delete post');
			res.status(200).json({mesasge: 'delete post!'});
		})
		.catch(err =>{
			if(!err.statusCode){
				err.statusCode = 500;
			};
			// kita tdk menggunakan throw error, krn ini asyncronous,
			//  next(err), akan menuju error handling middleware express
			next(err);
		});
}



