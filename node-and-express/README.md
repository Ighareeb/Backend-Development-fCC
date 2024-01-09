# Express object has several methods

One fundamental method is app.listen(port)-> tells your server to listen on a given port, putting it in running state.

In Express, routes takes the following structure:
app.METHOD(PATH, HANDLER).
METHOD is an http method in lowercase (eg. get, put, post, delete).
PATH is a relative path on the server (it can be a string, or even a regular expression).
HANDLER is a function that Express calls when the route is matched. Handlers take the form function(req, res) {...}, where req is the request object, and res is the response object. For example, the handler

function(req, res) {
  res.send('Response String');
}
will serve the string 'Response String'.

You can respond to requests with a file using the res.sendFile(path) method.
You can put it inside the app.get('/', ...) route handler.
This method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. This method needs an absolute file path.
__dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file. (Always gives the path of the current module's directory.)
process.cwd() - Gives the current working directory, which might be different if the process has changed directories.

eg. absolutePath = __dirname + '/relativePath/file.ext'

An HTML server usually has one or more directories that are accessible by the user where you can place static assets needed by your application (stylesheets, scripts, images).
In Express, you can put in place this functionality using the middleware express.static(path), where the path parameter is the absolute path of the folder containing the assets.
Middleware are functions that intercept route handlers, adding some kind of information.
A middleware needs to be mounted using the method app.use(path, middlewareFunction). The first path argument is optional. If you don’t pass it, the middleware will be executed for all requests.

--HTML server serves HTML, an API serves data.
A REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb). The GET verb is used when you are fetching some information, without modifying anything. Preferred data format for moving information around the web is JSON.

Create a simple API by creating a route that responds with JSON at the path  eg. /json. You can do it as usual, with the app.get() method. Inside the route handler, use the method res.json(), passing in an object as an argument.
This method closes the request-response loop, returning the data. Behind the scenes, it converts a valid JavaScript object into a string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back. A valid object has the usual structure {key: data}. data can be a number, a string, a nested object or an array. data can also be a variable or the result of a function call, in which case it will be evaluated before being converted into a string.

---------
.env file in the root of your project directory - environment variable as a configuration option.
need to use dotenv package to load environment variables from your .env file into process.env -->add require('dotenv').config() to load the environment variables.
