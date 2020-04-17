//===========================================
// Dependencies
//-------------------------------------------

require('dotenv').config();

const router = require('express').Router(),
	jwt = require('jsonwebtoken'),
	crypto = require('crypto'),
	nodeMailer = require('nodemailer');

//===========================================
// Other Dependencies
//-------------------------------------------

const { JWTVerifier } = require('../lib/passport');

//===========================================
// Models
//-------------------------------------------

const db = require('../models');

//===========================================
// Routes
//-------------------------------------------
// GET: All
//-------------------------------------------

router.get('/', (req, res) => {
	db.User
		.findAll()
		.then(foundUsers => {
			res.json({ success: true, users: foundUsers });
		})
		.catch(err => {
			res.json({ success: false, error: err });
		});
});

//-------------------------------------------
// GET: Me
//-------------------------------------------

router.get('/me', JWTVerifier, (req, res) => {
	console.log('user', req.user);

	const response = {
		status : 200,
		user   : {
			id       : req.user.id,
			username : req.user.username,
			email    : req.user.email,
			isAuth   : true
		}
	};
	console.log('req.user:', req.user);
	console.log('response:', response);
	res.json(response);
});

//-------------------------------------------
// GET: One
//-------------------------------------------

router.get('/:id', (req, res) => {
	const response = {},
		{ id } = req.params;

	db.User
		.findByPk(id)
		.then(foundUser => {
			response.status = 200;
			response.user = foundUser;
			console.log(response);
			res.json(response);
		})
		.catch(err => {
			response.status = 500;
			response.error = err;
			response.message = 'Server error. Please try again.';
			console.log(response);
			return res.json(response);
		});
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

// router.post('/', (req, res) => {
// 	const { newUser } = req.body;

// 	db.User
// 		.create(newUser)
// 		.then(createdUser => {
// 			res.json({ success: true, data: createdUser });
// 		})
// 		.catch(err => {
// 			res.json({ success: false, error: err });
// 		});
// });

//-------------------------------------------
// Register || CREATE: One
//-------------------------------------------

router.post('/register', (req, res) => {
	const response = {},
		{ newUser } = req.body;
	db.User
		.create(newUser)
		.then(createdUser => {
			response.status = 200;
			response.user = {
				id        : createdUser.id,
				username  : createdUser.username,
				email     : createdUser.email,
				isAuth    : true,
				authToken : jwt.sign(
					{ sub: createdUser.id },
					process.env.JWT_SECRET
				)
			};
			console.log(response);
			res.json(response);
		})
		.catch(err => {
			response.status = 500;
			response.error = err;
			response.message = 'Server error';
			console.log(response);
			res.json(response);
		});
});

//-------------------------------------------
// Login
//-------------------------------------------

router.post('/login', (req, res) => {
	const response = {},
		{ username, password } = req.body;

	db.User.findOne({ where: { username } }).then(foundUser => {
		if (!foundUser) {
			response.status = 404;
			response.error = 'Not found';
			response.message = "We couldn't find a user with that username";
			return res.json(response);
		}

		if (!foundUser.comparePassword(password)) {
			response.status = 401;
			response.error = 'Unauthorized';
			response.message = "The username and password don't match";
			return res.json(response);
		}

		response.status = 200;
		response.user = {
			id        : foundUser.id,
			username  : foundUser.username,
			email     : foundUser.email,
			isAuth    : true,
			authToken : jwt.sign(
				{ sub: foundUser.id },
				process.env.JWT_SECRET
			)
		};
		console.log(response);
		res.json(response);
	});
});

//-------------------------------------------
// UPDATE: One
//-------------------------------------------

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { updatedUser } = req.body;

	db.User
		.update(updatedUser, { where: { id: id } })
		.then(updatedUser => {
			res.json({ success: true, user: updatedUser });
		})
		.catch(err => {
			res.json({ success: false, error: err });
		});
});

//-------------------------------------------
// DELETE: One
//-------------------------------------------

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	db.User
		.destroy({ where: { id: id } })
		.then(foundUser => {
			res.json({ success: true, user: foundUser });
		})
		.catch(err => {
			res.json({ success: false, error: err });
		});
});

module.exports = router;
