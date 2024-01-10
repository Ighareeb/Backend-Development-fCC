The following post explains the conventions that node.js uses for its callback patterns (referred to as Continuation-passing style) and how you should implement them in order to comply.

#### First argument is an error object pattern

Node expects - almost - all callback functions to accept an Error object as the first argument. If no error occurred, the first argument should be null. If you use inline anonymous functions, this is a typical code snippet that you will encounter using node:

```js
// include the filesystem module
var fs = require('fs');

// fs.readFile: read a file and all its contents,
//              then call a callback function
fs.readFile('/some/file', function (err, contents) {

    // if any error occurred, throw it
    if (err) throw err;

    // do something when no error occurred
    /* something(); */

});
```

There is a reason why this is a useful pattern: Imagine, you have a chain of asynchronous functions that were to execute one after the other. I.e. read a file, get something out of a database, write something into the database and output the results to a callback function.

Now think something went wrong in the first function, i.e. the file cannot be read. You don’t want to blindly execute the other functions next in line. Instead, you skip the other functions and directly return to your callback function and let it choose how to handle the error. When no error occurred, continue with the next step.

#### Waterfall pattern

It lets you waterfall through function chains and leaves handling the error it up to the original invoking function. It is likely that you do not want to throw uncaught errors all the time.
<https://gist.github.com/2549029>

```js
var fs = require('fs');

// read a file
function read_the_file(filename, callback) {

    // begin by reading a file
    fs.readFile(filename, function (err, contents) {

        // an error occurred, i.e. the file was not found.
        // instead of throwing an error, skip the other 
        // functions and directly invoke the callback
        // function and provide the error object
        if (err) return callback(err);

        // continue
        read_data_from_db(null, contents, callback);
    });

} // read_the_file()

// this function would hold the next step
function read_data_from_db(err, contents, callback) {
    /* logic here */
} // read_data_from_db()


// this function call could originate from somewhere else
// in your code.
read_the_file('/some/file', function (err, result) {
    
    // don't throw the error, just log it (just because)
    if (err) {
        console.log(err);
        return;
    }

    // do something with the result
});
```

Pass error objects, not strings
While we’re at it, when you create errors, you should create actual Error objects that are passed around. When Error objects are created, the JavaScript engine inserts additional information into them (i.e. the stack trace, file name, line number) that you can be useful for debugging.

#### Callback function in last args pattern
<https://gist.github.com/2549052>

```js

// example function that raises an error
function example (callback) {

    // correct approach
    return callback ( new Error('an error occurred') );

    // NO! BAD KITTY!
    return callback ('an error occurred');

} // some_function()


// call example function
example( function (err, result) {

    // if you passed an error object, this will give
    // you additional information about the error, i.e.
    // the stacktrace. If you only passed a string,
    // you would now only see that string.
    if (err) console.log(err);

});
```

If your function expects a callback function as an argument, it should be the last argument. That callback function in turn should also accept an Error object or null as the first argument, as described above.

Note that if you do not need a callback function, i.e. when you just don’t perform asynchroneous actions, you don’t forcefully need to demand one.

Additional and optional arguments go in between
Any more arguments, required or optional, should go in between the error and the callback parameter. Below is an example how you could retrieve the optional arguments:

#### Optional args pattern
<https://gist.github.com/2549131>

```js
// example function where arguments 2 and 3 are optional
function example( err, optionalA, optionalB, callback ) {

    // retrieve arguments as array
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    // first argument is the error object
    // shift() removes the first item from the
    // array and returns it
    err = args.shift();

    // last argument is the callback function.
    // pop() removes the last item in the array
    // and returns it
    callback = args.pop();

    // if args still holds items, these are
    // your optional items which you could
    // retrieve one by one like this:
    if (args.length > 0) optionalA = args.shift(); else optionalA = null;
    if (args.length > 0) optionalB = args.shift(); else optionalB = null;

    // continue as usual: check for errors
    if (err) return callback(err);

    // for tutorial purposes, log the optional parameters
    console.log('optionalA:', optionalA);
    console.log('optionalB:', optionalB);

    /* do your thing */

} // example()


// invoke example function with and without optional arguments

example(null, function (err) {   /* do something */    });

example(null, 'AA', function (err) {});

example(null, 'AAAA', 'BBBB', function (err) {});
```

Note that there other ways to check whether the optional arguments were supplied. This is just a very broad pattern that you can reuse.

When to apply these pattern fully
You don’t always need to follow this pattern in detail. Use common sense to find out where to omit certain arguments.

When your function is the first in line of a longer chain of asynchroneous calls, it does not need to accept an Error object. The next in line should though.
When your function does not perform any asynchroneous calls and you can simply return your result, you don’t need to take a callback function.
If your function returns multiple arguments and may fail, even though it is not asynchroneous, you may very well feed them to a callback function instead of stuffing them into a return statement. This way your code is more readable - to node developers.
The more node.js style code and API’s you encounter, the more you will see that these patterns are used broadly among node libraries and modules and that it makes sense to use these.
