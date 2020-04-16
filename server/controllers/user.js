//===========================================
// Dependencies
//-------------------------------------------

const router = require('express').Router();

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
		.then(foundUser => {
			res.json({ success: true, data: foundUser });
		})
		.catch(err => {
			res.json({ success: false, error: err });
		});
});

//-------------------------------------------
// GET: One
//-------------------------------------------

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db.User
		.findOne({ where: { id: id } })
		.then(foundUser => {
			res.json({ success: true, data: foundUser });
		})
		.catch(err => {
			res.json({ success: false, error: err });
		});
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post('/', (req, res) => {
	const { newUser } = req.body;

	db.User
		.create(newUser)
		.then(createdUser => {
			res.json({ success: true, data: createdUser });
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
			res.json({ success: true, data: updatedUser });
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
			res.json({ success: true, data: foundUser });
		})
		.catch(err => {
			res.json({ success: false, error: err });
		});
});

module.exports = router;
