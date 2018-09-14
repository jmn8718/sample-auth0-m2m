const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const express = require('express');
const logger = require('morgan');

const routes = require('./routes')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized', reason: err.message });
  }
});

module.exports = app;