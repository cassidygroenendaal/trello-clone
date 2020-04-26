//===========================================
// Dependencies
//-------------------------------------------

const api = require('express').Router();

//===========================================
// Routes
//-------------------------------------------

api.use('/u', require('./user'));
api.use('/b', require('./board'));
api.use('/l', require('./list'));

module.exports = api;
