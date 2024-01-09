require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');

console.log('Hello World');
let app = express(); //create an Express app object

// app.get('/', function (req, res) {
// 	res.send('Hello Express');
// });
//----------
app.get('/', function (req, res) {
	const absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
});
//----------
// access static asset styles.css with middleware
app.use('/public', express.static(__dirname + '/public'));
// //----------
// //Implement a Root-Level Request Logger Middleware
// app.use('/', function (req, res, next) {
// 	console.log(`${req.method} ${req.path} - ${req.ip}`);
// 	next();
// });
// //----------
// //create simple API route
// app.get('/json', function (req, res) {
// 	process.env.MESSAGE_STYLE === 'uppercase'
// 		? res.json({ message: 'HELLO JSON' })
// 		: res.json({ message: 'Hello json' });
// });
//Chain Middleware to Create a Time Server
// app.get(
// 	'/now',
// 	function (req, res, next) {
// 		req.time = new Date().toString();
// 		next();
// 	},
// 	function (req, res) {
// 		res.send({ time: req.time });
// 	},
// );
// //Get Route Parameter Input from the Client
// app.get('/:word/echo', function (req, res) {
// 	res.send({ echo: req.params.word });
// });
//Use body-parser to Parse POST Requests (needs to be before the route it depends on i.e. /name)
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// //Get Query Parameter Input from the Client
app.get('/name', function (req, res) {
	let firstName = req.query.first;
	let lastName = req.query.last;
	res.json({ name: `${firstName} ${lastName}` });
});
//Get Data from POST Requests. (change to app.post and req.body instead of req.query)
//check network.payload in dev tools to see the POST data
app.post('/name', function (req, res) {
	let firstName = req.body.first;
	let lastName = req.body.last;
	res.json({ name: `${firstName} ${lastName}` });
});
module.exports = app;
