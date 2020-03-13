const express = require('express');

const bodyParser = require('body-parser');
const session = require('express-session');

var db = require('./config/Database');
var route = require('./config/route');

const hostname = 'localhost';
const PORT = 5002;

// Set up the express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/design', express.static(__dirname +'/design'));

// init all available routes
app.use('/', route);

app.listen(PORT, hostname, () => {
  console.log(`server running at http://${hostname}:${PORT}/`)
});