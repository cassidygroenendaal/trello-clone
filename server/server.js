//===========================================
// Dependencies
//-------------------------------------------
const express = require('express'),
	logger = require('morgan'),
	path = require('path');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({
		path : path.resolve(__dirname, '.env')
	});
}

const db = require('./models'),
	{ passport } = require('./lib/passport');

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

if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

//===========================================
// Middleware
//-------------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(passport.initialize())

//===========================================
// Setting Up Static Server (PRODUCTION MODE)
//-------------------------------------------

if (process.env.NODE_ENV === 'production') {
	const clientBuildPath = path.join(
		__dirname,
		'..',
		'client',
		'build'
	);
	console.log(`Client build path: ${clientBuildPath}\n`);
	app.use(express.static(clientBuildPath));
}

//===========================================
// Routes
//-------------------------------------------

app.use('/api', require('./controllers'));

app.get('*', (req, res) => {
	const clientBuildPath = path.join(
		__dirname,
		'..',
		'client',
		'build',
		'index.html'
	);
	res.sendFile(clientBuildPath);
});

//===========================================
// Main
//-------------------------------------------

db.sequelize.sync(syncOptions).then(function() {
	app.listen(PORT, () =>
		console.log(`==> LISTENING ON PORT ${PORT}`)
	);
});
