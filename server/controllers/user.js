//===========================================
// Dependencies
//-------------------------------------------

require('dotenv').config();

const router = require('express').Router(),
	{ Op } = require('sequelize'),
	crypto = require('crypto'),
	nodeMailer = require('nodemailer');

//===========================================
// Other Dependencies
//-------------------------------------------

const { jwtVerifier, jwtSignature } = require('../lib/passport');

//===========================================
// Models
//-------------------------------------------

const db = require('../models');

const listUniqueFields = [ 'username', 'email' ];

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

router.get('/me', jwtVerifier, (req, res) => {
	const response = {
		status : 200,
		user   : {
			id       : req.user.id,
			username : req.user.username,
			email    : req.user.email,
			fullname : req.user.fullname,
			bio      : req.user.bio,
			initials : req.user.initials,
			avatar   : req.user.avatar,
			isAuth   : true
		}
	};
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
// Register || CREATE: One
//-------------------------------------------

router.post('/register', (req, res) => {
	const response = {},
		{ newUser } = req.body;

	const createUser = user => {
		user.initials = user.fullname
			.split(' ')
			.map(name => name[0])
			.join('');

		db.User
			.create(user)
			.then(createdUser => {
				response.status = 200;
				response.user = {
					id        : createdUser.id,
					username  : createdUser.username,
					email     : createdUser.email,
					fullname  : createdUser.fullname,
					bio       : createdUser.bio,
					initials  : createdUser.initials,
					avatar    : createdUser.avatar,
					isAuth    : true,
					authToken : jwtSignature(createdUser.email)
				};
				console.log(response);
				res.json(response);
			})
			.catch(err => {
				if (err.parent && err.parent.errno === 1062) {
					response.status = 1062;
					response.error = err;
					response.message = `A user with the ${err.errors[0]
						.path} '${err.errors[0].value}' already exists`;
				} else {
					response.status = 500;
					response.error = err;
					response.message = 'Server error';
				}
				console.log(response);
				res.json(response);
			});
	};

	const generateUsername = fullname => {
		const randTotal = Math.ceil(Math.random() * 6);
		for (let i = 0; i < randTotal; i++) {
			fullname += Math.floor(Math.random() * 10);
		}

		return fullname;
	};

	const validateUsername = name => {
		fullname = name.split(' ').join('').toLowerCase();

		db.User
			.findOne({ where: { username: fullname } })
			.then(foundUser => {
				if (!foundUser) {
					newUser.username = fullname;
					return createUser(newUser);
				}

				validateUsername(generateUsername(fullname));
			})
			.catch(err => {
				response.message = 'There was some kind of error.';
				response.error = err;
				console.log(err);
				res.json(response);
			});
	};

	validateUsername(newUser.fullname);
});

//-------------------------------------------
// Login
//-------------------------------------------

router.post('/login', (req, res) => {
	const response = {},
		{ email, password } = req.body;

	db.User.findOne({ where: { email } }).then(foundUser => {
		if (!foundUser) {
			response.status = 404;
			response.error = 'Not found';
			response.message = "We couldn't find a user with that username";
			return res.json(response);
		}

		if (!foundUser.comparePassword(password)) {
			response.status = 401;
			response.error = 'Unauthorized';
			response.message = "The email and password don't match";
			return res.json(response);
		}

		response.status = 200;
		response.user = {
			fullname  : foundUser.fullname,
			bio       : foundUser.bio,
			initials  : foundUser.initials,
			avatar    : foundUser.avatar,
			id        : foundUser.id,
			username  : foundUser.username,
			email     : foundUser.email,
			isAuth    : true,
			authToken : jwtSignature(foundUser.email)
		};
		console.log(response);
		res.json(response);
	});
});

//-------------------------------------------
// Forgot Password
//-------------------------------------------

router.post('/forgot', (req, res) => {
	const response = {},
		{ email } = req.body;
	console.log(email);

	// Return an error if email is empty
	if (!email) {
		response.status = 400;
		response.error = 'Bad request';
		response.message = 'An email address is required.';
		console.log(response);
		return res.json(response);
	}

	// Look up the user with the email
	db.User
		.findOne({ where: { email } })
		.then(foundUser => {
			// Return an error if there is no user with that email
			if (!foundUser || foundUser === null) {
				response.status = 404;
				response.error = 'Not found';
				response.message = "That email isn't in our records.";
				console.log(response);
				return res.json(response);
			}

			// If no errors, make a reset token
			const token = crypto.randomBytes(20).toString('hex');

			// Set the token on the foundUser
			foundUser.resetPasswordToken = token;
			foundUser.resetPasswordExpires = Date.now() + 360000;
			return foundUser.save();
		})
		.then(updatedUser => {
			const token = updatedUser.dataValues.resetPasswordToken;
			// Initialize nodeMailer Transporter
			const transporter = nodeMailer.createTransport({
				service : 'gmail',
				auth    : {
					user : process.env.EMAIL_ADDRESS,
					pass : process.env.EMAIL_PASSWORD
				}
			});

			// Body of Reset Request Email
			const mailOptions = {
				from    : 'no-response@starter.dev',
				to      : email,
				subject : 'Starter.com Password Reset',
				text    : `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
Please click on the following link, or paste this into your browser to complete the process:\n\n
http://localhost:3000/reset/${token} \n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`
			};

			transporter.sendMail(mailOptions, (err, mailResponse) => {
				// Return an error if there is one
				if (err) {
					response.status = 500;
					response.error = err;
					response.message = 'Server error. Please try again.';
					console.error(response);
					return res.json(response);
				}

				// Mail sent ok
				response.status = 200;
				console.log(response);
				res.json(response);
			});
		})
		.catch(err => {
			response.status = 500;
			response.error = err;
			console.error(response);
			return res.json(response);
		});
});

//-------------------------------------------
// GET: One to Reset Password
//-------------------------------------------

router.get('/reset/:token', (req, res) => {
	const response = {},
		{ token } = req.params;

	// Find a user with a valid, matching token
	db.User
		.findOne({
			where : {
				resetPasswordToken   : token,
				resetPasswordExpires : { [Op.gt]: Date.now() }
			}
		})
		.then(foundUser => {
			// If no user was found
			if (!foundUser || foundUser === null) {
				response.status = 403;
				response.error = 'Forbidden';
				response.message =
					'That token is either invalid or has expired.';
				console.log(response);
				return res.json(response);
			}

			// Send back the id of the foundUser
			response.status = 200;
			response.userId = foundUser.id;
			console.log(response);
			res.json(response);
		})
		.catch(err => {
			response.status = 500;
			response.error = err;
			console.error(response);
			return res.json(response);
		});
});

//-------------------------------------------
// UPDATE: One to Reset Password
//-------------------------------------------

router.put('/reset', (req, res) => {
	const response = {},
		{ id, password } = req.body;

	db.User
		.findByPk(id)
		.then(foundUser => {
			foundUser.password = password;
			foundUser.resetPasswordToken = null;
			foundUser.resetPasswordExpires = null;
			return foundUser.save();
		})
		.then(updatedUser => {
			// Initialize nodeMailer Transporter
			const transporter = nodeMailer.createTransport({
				service : 'gmail',
				auth    : {
					user : process.env.EMAIL_ADDRESS,
					pass : process.env.EMAIL_PASSWORD
				}
			});

			// Body of Reset Success Email
			const mailOptions = {
				from    : 'no-response@starter.dev',
				to      : updatedUser.email,
				subject : 'Starter.com Password Reset Success',
				text    : `Hello ${updatedUser.username},\n
This is a confirmation that the password associated with your ${updatedUser.email} account has just been changed.\n`
			};

			transporter.sendMail(mailOptions, (err, mailResponse) => {
				// Return an error if there is one
				if (err) {
					response.status = 500;
					response.error = err;
					response.message = 'Server error. Please try again.';

					console.error(response);
					return res.json(response);
				}
			});

			// Send back a user object that we create, removing vulnerable information
			response.status = 200;
			response.user = {
				fullname  : updatedUser.fullname,
				bio       : updatedUser.bio,
				initials  : updatedUser.initials,
				avatar    : updatedUser.avatar,
				id        : updatedUser.id,
				username  : updatedUser.username,
				email     : updatedUser.email,
				isAuth    : true,
				authToken : jwtSignature(updatedUser.email)
			};

			console.log(response);
			res.json(response);
		})
		.catch(err => {
			response.status = 500;
			response.error = err;
			console.error(response);
			return res.json(response);
		});
});
//-------------------------------------------
// UPDATE: One
//-------------------------------------------

router.put('/:id', (req, res) => {
	const response = {};
	const { id } = req.params;
	const { updatedInfo } = req.body;

	db.User
		.findByPk(id)
		.then(foundUser => {
			for (let key in updatedInfo) {
				if (foundUser[key] !== updatedInfo[key]) {
					foundUser[key] = updatedInfo[key];
				}
			}

			return foundUser.save();
		})
		.then(updatedUser => {
			// Send back a user object that we create, removing vulnerable information
			response.status = 200;
			response.user = {
				username : updatedUser.username,
				email    : updatedUser.email
			};

			console.log('UPDATED USER:', response);
			res.json(response);
		})
		.catch(err => {
			if (err.parent && err.parent.errno === 1062) {
				response.status = 1062;
				response.error = err;
				response.message = `A user with the ${err.errors[0]
					.path} '${err.errors[0].value}' already exists`;
			} else {
				response.status = 500;
				response.error = err;
				response.message = 'Server error';
			}
			console.error(response);
			return res.json(response);
		});
});

//-------------------------------------------
// UPDATE: One to change password
//-------------------------------------------

router.put('/:id/password', (req, res) => {
	const response = {};
	const { id } = req.params;
	const { oldPassword, newPassword } = req.body;

	if (oldPassword && newPassword) {
		db.User
			.findByPk(id)
			.then(foundUser => {
				if (!foundUser.comparePassword(oldPassword)) {
					response.status = 401;
					response.error = 'Unauthorized';
					response.message = 'The password you entered is incorrect';
					return res.json(response);
				}
				if (foundUser.comparePassword(newPassword)) {
					response.status = 401;
					response.error = 'Unauthorized';
					response.message =
						'Your new password cannot be the same as your previous password.';
					return res.json(response);
				}

				foundUser.password = newPassword;
				foundUser.save().then(updatedUser => {
					response.status = 200;
					res.json(response);
				});
			})
			.catch(err => {
				response.status = 500;
				response.error = err;
				console.error(response);
				return res.json(response);
			});
	}
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
