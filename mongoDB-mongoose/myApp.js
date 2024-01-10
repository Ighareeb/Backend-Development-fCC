require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
//create/define schema
let personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFoods: [String],
});
//create Person model from the schema
const Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model
//create a document instance using the Person model constructor
const createAndSavePerson = (done) => {
	const islam = new Person({
		name: 'Islam',
		age: 38,
		favoriteFoods: ['beans', 'oatmeal', 'spinach'],
	});
	islam.save(function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};
//Create Many Records
const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};
//Use modelName.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};
//Use model.findById() to Search Your Database By _id
//When saving a document, MongoDB automatically adds the field === _id
const findPersonById = (personId, done) => {
	Person.findById({ _id: personId }, function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = 'hamburger';

	done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	done(null /*, data*/);
};

const removeById = (personId, done) => {
	done(null /*, data*/);
};

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary';

	done(null /*, data*/);
};

const queryChain = (done) => {
	const foodToSearch = 'burrito';

	done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
