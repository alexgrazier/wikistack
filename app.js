const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

//morgan is logging middleware for http requests
app.use(morgan('dev'));

//serves up static files in public folder (eg. css or html files)
app.use(express.static(path.join(__dirname, './public')));

//body parsing middleware built into express
//parses the incoming request (originally coming as urlencoded or json encoded)
//middleware gives back a new body object containing the parsed data on req.body

//parses incoming requests with url encoded payloads,
app.use(express.urlencoded({ extended: false }));
//parses incoming requests with json encoded payloads
app.use(express.json());

//these routes are mounted on the app
// app.use('/wiki', require('./routes.wiki'));
// app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.json('hello world')
});

const PORT= 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`)
})

module.exports = app;
