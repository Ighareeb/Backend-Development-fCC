# MongoDB and Mongoose NOTES

<https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/>
MongoDB is a database application that stores JSON documents (or records) that you can use in your application.
Unlike SQL, another type of database, MongoDB is a non-relational or "NoSQL" database. This means MongoDB stores all associated data within one record, instead of storing it across many preset tables as in a SQL database.

Mongoose = npm package for interacting with MongoDB.
With Mongoose, you can use plain JavaScript objects instead of JSON, which makes it easier to work with MongoDB.
Also, it allows you to create blueprints for your documents called schemas, so you don't accidentally save the wrong type of data and cause bugs later.
--> interact with MongoDB using plain JS objects instead of JSON; createschemas/blueprints for data

<https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/>

## Schemas & Models --> documents

[think of schema as constructor() for Model === class; and documents === instantiated objects from that class.]
Each SCHEMA maps to a MongoDB collection and defines the shape of the documents within that collection.
schemas are building blocks for MODELS. schemas can be nested to create complex data structures/models.
MODELS allow you to create instances of your objects - called DOCUMENTS.
When you are building schema you can use either of three options (example for name) validation

```js
name: String
name: {type: String}
name: {type: String, required: true} //preferred
```

## Create a Model

CRUD Part I - CREATE:
The done() function is a callback that tells us that we can proceed after completing an asynchronous operation such as inserting, searching, updating, or deleting.
It's following the Node convention, and should be called as done(null, data) on success, or done(err) on error.

```js
const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

## Create and Save a Record of a Model

Create a document instance using the Person model constructor. Pass to the constructor an object having the schema fields. Their types must conform to the ones in the Schema.
Then, call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.
**Create Many Records with model.create()
create many instances of your models, e.g. when seeding a database with initial data. Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and saves them all in the db.

## Use model.find() to Search Your Database

(In its simplest usage), <ModelName.find()> accepts a query document (a JSON object) as the first argument, then a callback. It returns an array of matches. It supports an extremely wide range of search options.
