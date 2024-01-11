const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.DB_URL);

//create schemas & instantiate models
const UserSchema = new Schema({
	username: String,
});
const User = mongoose.model('User', UserSchema);

const ExerciseSchema = new Schema({
	user_id: { type: String, required: true },
	description: String,
	duration: Number,
	date: Date,
});
const Exercise = mongoose.model('Exercise', ExerciseSchema);
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //middleware to get req.body
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});
//get list of all users
app.get('/api/users', async (req, res) => {
	const users = await User.find({}).select('_id username');
	if (!users) {
		res.send('No users found');
	} else {
		res.json(users);
	}
});

app.post('/api/users', async (req, res) => {
	const userObj = new User({ username: req.body.username });
	try {
		const user = await userObj.save();
		console.log(user);
		res.json(user);
	} catch (err) {
		console.log(err);
	}
	res.json({ hey: 'hello' });
});

app.post('/api/users/:_id/exercises', async (req, res) => {
	const id = req.params._id;
	const { description, duration, date } = req.body;

	try {
		const user = await User.findById(id);
		if (!user) {
			res.send('Could not finid user');
		} else {
			const exerciseObj = new Exercise({
				user_id: id,
				description: description,
				duration: duration,
				data: date ? new Date(date) : new Date(),
			});
			const exercise = await exerciseObj.save();
			res.json({
				_id: user._id,
				username: user.username,
				description: exercise.description,
				duration: exercise.duration,
				date: new Date(exercise.date).toDateString(),
			});
		}
	} catch (err) {
		console.log(err);
		res.send('There was an error saving the exercise');
	}
});

//return object with a <log> arrat of all exercises added
app.get('/api/users/:_id/logs', async (req, res) => {
	const { from, to, limit } = req.query;
	const id = req.params._id;
	const user = await User.findById(id);
	if (!user) {
		res.send('Could not find user');
		return;
	}
	//build query
	let dateObj = {}; //used to filter
	if (from) {
		dateObj['$gte'] = new Date(from); //greater than or equal to
	}
	if (to) {
		dateObj['$lte'] = new Date(to); //less than or equal to
	}
	let filter = {
		user_id: id,
	};
	if (from || to) {
		filter.date = dateObj;
	}
	//+ parses limit string to number
	const exercises = await Exercise.find(filter).limit(+limit ?? 500);
	//need to map log so keys are different and formatted correctly
	const log = exercises.map((e) => ({
		description: e.description,
		duration: e.duration,
		date: new Date(e.data).toDateString(),
	}));
	//response format object
	res.json({
		username: user.username,
		count: exercises.length,
		_id: user._id,
		log,
	});
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
