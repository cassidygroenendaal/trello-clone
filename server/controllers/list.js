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

router.get('/', jwtVerifier, (req, res) => {
	db.List
		.findAll()
		.then(foundLists => {
			res.json({ status: 200, lists: foundLists });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// GET: All of A Given Board's Lists
//-------------------------------------------

router.get('/b/:boardId', jwtVerifier, (req, res) => {
	const boardId = parseInt(req.params.boardId);

	db.List
		.findAll({ where: { BoardId: boardId } })
		.then(foundLists => {
			const sortedLists = foundLists.sort(
				(a, b) => a.position - b.position
			);
			res.json({ status: 200, lists: sortedLists });
		})
		.catch(err => {
			console.log(err);
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// GET: One
//-------------------------------------------

router.get('/:id', jwtVerifier, (req, res) => {
	const { id } = req.params;

	db.List
		// .findByPk(id, { include: [ db.User ] })
		.findByPk(id)
		.then(foundList => {
			res.json({ status: 200, list: foundList });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post('/', jwtVerifier, (req, res) => {
	const { newList } = req.body;

	db.List
		.create(newList)
		.then(createdList => {
			res.json({ status: 200, list: createdList });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// UPDATE: Many
//-------------------------------------------

router.put('/', jwtVerifier, (req, res) => {
	const { updatedInfo } = req.body;

	updatedInfo.forEach((list, i) => {
		db.List
			.findByPk(list.id)
			.then(foundList => {
				for (let key in list) {
					if (foundList[key] !== list[key]) {
						foundList[key] = list[key];
					}
				}
				return foundList.save();
			})
			.then(updatedLists => {
				if (i + 1 === updatedInfo.length)
					return res.json({ status: 200, list: updatedList });
			})
			.catch(err => {
				res.json({ status: 500, error: err });
			});
	});
});

//-------------------------------------------
// UPDATE: One
//-------------------------------------------

router.put('/:id', jwtVerifier, (req, res) => {
	const { id } = req.params;
	const { updatedInfo } = req.body;

	db.List
		.findByPk(id)
		.then(foundList => {
			for (let key in updatedInfo) {
				if (foundList[key] !== updatedInfo[key]) {
					foundList[key] = updatedInfo[key];
				}
			}
			return foundList.save();
		})
		.then(updatedList => {
			res.json({ status: 200, list: updatedList });
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

	db.List
		.destroy({ where: { id: id } })
		.then(foundList => {
			res.json({ status: true, list: foundList });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

module.exports = router;
