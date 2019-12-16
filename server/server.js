//===========================================
// Dependencies
//-------------------------------------------

const mongoose = require("mongoose"),
  express = require("express"),
  logger = require("morgan");

//===========================================
// Configs
//-------------------------------------------

const PORT = process.env.PORT || 3001;

//-------------------------------------------
// Express
//-------------------------------------------

const app = express();

//-------------------------------------------
// Mongoose Set Up
//-------------------------------------------

// Sets our database connection URL
const dbConnection = process.env.MONGODB_URI || "mongodb://localhost/identifier_app_db";

// Establishes a connection to the database
mongoose.connect(dbConnection, { useNewUrlParser: true });

let db = mongoose.connection;

// checks if connection with the database is successful
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

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

app.listen(PORT, () => console.log(`==> LISTENING ON PORT ${PORT}`));
