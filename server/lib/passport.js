//===========================================
// Dependencies
//-------------------------------------------

require('dotenv').config();

const passport = require('passport'),
	jwt = require('jsonwebtoken'),
	{ Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const jwtOpts = {
	jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey    : process.env.JWT_SECRET
};

//===========================================
// Models
//-------------------------------------------

const db = require('../models');

//===========================================
// jwtSignature
//-------------------------------------------

const jwtSignature = sub =>
	jwt.sign({ sub }, jwtOpts.secretOrKey, { expiresIn: '6d' });

//===========================================
// jwtVerifier
//-------------------------------------------

const strategy = new JwtStrategy(jwtOpts, function(jwtPayload, next) {
	const { sub, exp } = jwtPayload;

	// const now = Math.floor(Date.now() / 1000),
	// 	timeToExp = exp - now;

	db.User
		.findByPk(sub)
		.then(foundUser => {
			// if (timeToExp < 60 * 60) {
			// 	console.log("There's less than an hour left!");
			// 	foundUser.needsRefresh = true;
			// } else {
			// 	console.log("You've got more than an hour left.");
			// }
			next(null, foundUser || false);
		})
		.catch(err => next(err, false));
});

passport.use(strategy);

const jwtVerifier = passport.authenticate('jwt', { session: false });

//===========================================
// Exports
//-------------------------------------------

module.exports = { passport, jwtVerifier, jwtSignature };
