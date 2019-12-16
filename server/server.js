const mongoose = require("mongoose"),
  express = require("express"),
  logger = require("morgan");

// const cors = require("cors");

const PORT = process.env.PORT || 3001,
  app = express();
// app.use(cors());

// Sets our database connection URL
const dbConnection = process.env.MONGODB_URI || "mongodb://localhost/identifier_app_db";

// Establishes our connection to our database
mongoose.connect(dbConnection, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(PORT, () => console.log(`==> LISTENING ON PORT ${PORT}`));
