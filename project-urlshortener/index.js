require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URL);
// Basic Configuration
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

const db = client.db('urlshortener');
const urls = db.collection('urls');
const urlparser = require('url');
const dns = require('dns');
//set up route handler to POST a URL and get JSON response with 'original_url' and 'short_url' props + redirect to original URL if short URL used + error handling if invalid URL used
app.post('/api/shorturl', function (req, res) {
	console.log(req.body);
	const url = req.body.url;
	const dnslookup = dns.lookup(
		urlparser.parse(url).hostname,
		async (err, address) => {
			if (err || !address) {
				res.json({ error: 'Invalid URL' });
			} else {
				const urlCount = await urls.countDocuments({});
				const urlDoc = {
					url: url,
					short_url: urlCount,
				};
				const result = await urls.insertOne(urlDoc);
				console.log(result);
				res.json({ original_url: url, short_url: urlCount });
			}
		},
	);
});

app.get('/api/shorturl/:short_url', async (req, res) => {
	const shorturl = req.params.short_url;
	const urlDoc = await urls.findOne({ short_url: +shorturl });
	res.redirect(urlDoc.url);
});
app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
