const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name:{
		type: String,
		reqiured: true
	},
	email:{
		type: String,
		reqiured: true
	},
	password:{
		type: String,
		reqiured: true
	},
	status:{
		type: String,
		default: 'new user'
	},
	posts:[{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}]
});


module.exports = mongoose.model('User', userSchema);