//===========================================
// Dependencies
//-------------------------------------------

const passport = require('passport'),
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
// JWTVerifier
//-------------------------------------------

const strategy = new JwtStrategy(jwtOpts, function(jwtPayload, next) {
	console.log('Payload:', jwtPayload);
	db.User
		.findByPk(jwtPayload.sub)
		.then(foundUser => next(null, foundUser || false))
		.catch(err => next(err, false));
});

passport.use(strategy);

const JWTVerifier = passport.authenticate('jwt', { session: false });

//===========================================
// Exports
//-------------------------------------------

module.exports = { passport, JWTVerifier };
