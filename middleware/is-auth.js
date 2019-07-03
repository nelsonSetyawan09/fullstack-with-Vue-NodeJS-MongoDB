const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
	// extract token from client (in headers)
	const headerAuth = req.get('Authorization');
	if(!headerAuth){
		const error = new Error('not authenticated');
		error.statusCode =401;
		throw error;
	};

	const token = headerAuth.split(' ')[1];
	let decodedToken;
	try{
		decodedToken = jwt.verify(token, 'moliSecret')
	}
	catch(err){
		err.statusCode = 500;
		throw err
	}
	if(!decodedToken){
		const error = new Error('not authenticated');
		error.statusCode =401;
		throw error;
	}
	req.userId = decodedToken.userId;
	next();
}