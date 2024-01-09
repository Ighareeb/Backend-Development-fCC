require('dotenv').config();

let express = require('express');
console.log('Hello World');
let app = express(); //create an Express app object
// app.get('/', function (req, res) {
// 	res.send('Hello Express');
// });
//----------
// app.get('/', function (req, res) {
// 	const absolutePath = __dirname + '/views/index.html';
// 	res.sendFile(absolutePath);
// });
//----------
// access static asset styles.css with middleware
app.use('/public', express.static(__dirname + '/public'));
//----------
//Implement a Root-Level Request Logger Middleware
app.use('/', function (req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});
//----------
//create simple API route
app.get('/json', function (req, res) {
	process.env.MESSAGE_STYLE === 'uppercase'
		? res.json({ message: 'HELLO JSON' })
		: res.json({ message: 'Hello json' });
});
//Chain Middleware to Create a Time Server
app.get(
	'/now',
	function (req, res, next) {
		req.time = new Date().toString();
		next();
	},
	function (req, res) {
		res.send({ time: req.time });
	},
);
module.exports = app;
