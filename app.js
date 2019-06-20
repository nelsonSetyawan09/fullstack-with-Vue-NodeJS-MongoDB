const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const multer  = require('multer')

const path = require('path')

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');


const MONGODB_URI ='mongodb://localhost:27017/fullstack_vue_node_mongoDB';

app = express();

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});


const fileFilter = (req,file, cb) =>{
	if( file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
		cb(null, true)
	}else{
		cb(null, false)
	}
}



app.use(bodyParser.urlencoded()); // <form>
app.use(bodyParser.json()); 	//json

// single('image') for formData name
app.use(multer({storage: fileStorage, fileFilter}).single('image'));

app.use('/images',express.static(path.join(__dirname, 'images')));

app.use((req,res,next) =>{
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE");
	res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With");
	next();
});


app.use('/feed',feedRoutes);
app.use('/auth',authRoutes);



app.use((error, req,res,next)=>{
	console.log(error);
	const status = error.statusCode || 500;
  const data = error.data;
	const message = error.mesasge;	// ini properties exist secara default
	res.status(status).json({message, data})
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