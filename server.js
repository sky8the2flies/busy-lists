const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

// load the "secrets" from .env
require('dotenv').config();

require('./config/database');

app.use(logger('dev'));
app.use(express.json());
// Configure both serve-favicon and static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API (AJAX) routes here, before the "catch all" route
app.use('/api/boards', require('./routes/api/boards'));
app.use('/api/users', require('./routes/api/users'));

// Catch all route
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
