const express = require('express');

const app = express();

app.use('/api', require('./ProductRoutes'));

module.exports = app;