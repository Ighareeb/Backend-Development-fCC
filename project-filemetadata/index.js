var express = require('express');
var cors = require('cors');
require('dotenv').config();
//multer middleware used for uploading files
const multer = require('multer');
const upload = multer();
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});
//add middleware to get file data from api
//html input name === upfile
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size,
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
