const express = require('express');
const app = express();
const morgan = require('morgan'); //shows in the terminal what happened and time
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const linkRoutes = require('./api/routes/links');
const userRoutes = require('./api/routes/users');
const contactRoutes = require('./api/routes/contacts');
const eventRoutes = require('./api/routes/events');


mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || 'mongodb://team18gosh.documents.azure.com:10255/goshundergraduateeducation?ssl=true', {
    auth: {
      user: 'team18gosh',
      password: 'RpKJW0WFGYTQsiQjbkZlnXVOdbfuvgXYLSTFTumOOyKGfLwegznTevXqJyhd8hSEGm7qh0m4Reqfg2NSLUyjjA=='
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var crypto = require("crypto");  

function getAuthorizationTokenUsingMasterKey(verb, resourceType, resourceId, date, masterKey) {  
    var key = new Buffer(masterKey, "base64");  

    var text = (verb || "").toLowerCase() + "\n" +   
               (resourceType || "").toLowerCase() + "\n" +   
               (resourceId || "") + "\n" +   
               date.toLowerCase() + "\n" +   
               "" + "\n";  

    var body = new Buffer(text, "utf8");  
    var signature = crypto.createHmac("sha256", key).update(body).digest("base64");  

    var MasterToken = "master";  

    var TokenVersion = "1.0";  

    return encodeURIComponent("type=" + MasterToken + "&ver=" + TokenVersion + "&sig=" + signature);  
}  

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); //make available to everyone
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//prevent CORS errors
app.use((res, req, next) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header(
		"Access-Control-Allow-Headers", 
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//routes which should handle requests
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/links', linkRoutes);
app.use('/events', eventRoutes);


app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
})


module.exports = app;