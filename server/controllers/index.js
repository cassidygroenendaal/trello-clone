//===========================================
// Dependencies
//-------------------------------------------

const api = require("express").Router();

//===========================================
// Routes
//-------------------------------------------

api.use("/u", require("./user"));
api.use("/model1", require("./model1"));

module.exports = api;
