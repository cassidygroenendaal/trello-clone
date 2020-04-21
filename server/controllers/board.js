//===========================================
// Dependencies
//-------------------------------------------

const router = require('express').Router();

//===========================================
// Other Dependencies
//-------------------------------------------

const { jwtVerifier } = require('../lib/passport');

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
	db.Board
		.findAll()
		.then(foundBoards => {
			res.json({ status: 200, boards: foundBoards });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// GET: All My Boards
//-------------------------------------------

router.get('/my-boards', jwtVerifier, (req, res) => {
	db.Board
		.findAll({ where: { UserId: req.user.id } })
		.then(foundBoards => {
			res.json({ status: 200, boards: foundBoards });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// GET: One
//-------------------------------------------

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db.Board
		.findByPk(id)
		.then(foundBoard => {
			res.json({ status: 200, board: foundBoard });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post('/', jwtVerifier, (req, res) => {
	const { newBoard } = req.body;

	newBoard.UserId = req.user.id;

	db.Board
		.create(newBoard)
		.then(createdBoard => {
			res.json({ status: 200, board: createdBoard });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// UPDATE: One
//-------------------------------------------

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { updatedBoard } = req.body;

	db.Board
		.findByPk(id)
		.then(foundBoard => {
			// Make changes
			return foundBoard.save();
		})
		.then(updatedBoard => {
			res.json({ status: 200, board: updatedBoard });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// DELETE: One
//-------------------------------------------

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	db.Board
		.destroy({ where: { id: id } })
		.then(foundBoard => {
			res.json({ status: true, board: foundBoard });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

module.exports = router;
