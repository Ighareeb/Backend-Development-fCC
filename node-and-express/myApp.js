console.log('Hello World');
let express = require('express');
let app = express(); //create an Express app object
// app.get('/', function (req, res) {
// 	res.send('Hello Express');
// });
app.get('/', function (req, res) {
	const absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
});
// access static asset styles.css with middleware
app.use('/public', express.static(__dirname + '/public'));

module.exports = app;
