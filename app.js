const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');

const path = require('path')

const feedRoutes = require('./routes/feed')

const MONGODB_URI ='mongodb://localhost:27017/fullstack_vue_node_mongoDB';

app = express();


app.use(bodyParser.urlencoded()); // <form>
app.use(bodyParser.json()); 	//json
app.use('/images',express.static(path.join(__dirname, 'images')));

app.use((req,res,next) =>{
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE");
	res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With");
	next();
})

app.use('/feed',feedRoutes);

app.use((error, req,res,next)=>{
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.mesasge;	// ini properties exist secara default
	res.status(status).json({message})
});


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
	useFindAndModify: false
})
  .then(result => {
    console.log('server running on port 3000')
   	app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });