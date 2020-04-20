//===========================================
// Dependencies
//-------------------------------------------

const api = require('express').Router();

//===========================================
// Routes
//-------------------------------------------

api.use('/u', require('./user'));
api.use('/b', require('./board'));

module.exports = api;
