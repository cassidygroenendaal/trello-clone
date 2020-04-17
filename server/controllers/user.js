//===========================================
// Dependencies
//-------------------------------------------

require('dotenv').config();

const router = require('express').Router(),
	// passport = require('passport'),
	crypto = require('crypto'),
	nodeMailer = require('nodemailer');

//===========================================
// Other Dependencies
//-------------------------------------------

// const algorithm = require("../lib/algorithm");

//===========================================
// Model
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
// GET: One
//-------------------------------------------

router.get('/:id', (req, res) => {
	const response = {},
		{ id } = req.params;

	db.User
		.findOne({ where: { id: id } })
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
	const { newUser } = req.body;
	db.User
		.create(newUser)
		.then(createdUser => {
			res.json({ success: true, user: createdUser });
		})
		.catch(err => {
			res.json({ success: false, error: err });
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
