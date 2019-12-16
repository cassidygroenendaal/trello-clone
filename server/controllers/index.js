//===========================================
// Dependencies
//-------------------------------------------

const api = require("express").Router();

//===========================================
// Routes
//-------------------------------------------

api.use("/model1", require("./model1"));
api.use("/model2", require("./model2"));

module.exports = api;
