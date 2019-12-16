//===========================================
// Dependencies
//-------------------------------------------

const express = require("express"),
  logger = require("morgan");

const db = require("./models");

//===========================================
// Configs
//-------------------------------------------

const PORT = process.env.PORT || 3001;

//-------------------------------------------
// Express
//-------------------------------------------

const app = express();

//-------------------------------------------
// Sequelize Set Up
//-------------------------------------------

const syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//===========================================
// Middleware
//-------------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

//===========================================
// Routes
//-------------------------------------------

app.use("/api", require("./controllers"));

//===========================================
// Main
//-------------------------------------------

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, () => console.log(`==> LISTENING ON PORT ${PORT}`));
});
