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
	db.Card
		.findAll()
		.then(foundCards => {
			res.json({ status: 200, cards: foundCards });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// GET: All of A Given Board's Cards
//-------------------------------------------

router.get('/b/:boardId', jwtVerifier, (req, res) => {
	const boardId = parseInt(req.params.boardId);

	db.Card
		.findAll({ where: { BoardId: boardId } })
		.then(foundCards => {
			const sortedCards = foundCards.sort(
				(a, b) => a.position - b.position
			);
			res.json({ status: 200, cards: sortedCards });
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

	db.Card
		// .findByPk(id, { include: [ db.User ] })
		.findByPk(id)
		.then(foundCard => {
			res.json({ status: 200, card: foundCard });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post('/', jwtVerifier, (req, res) => {
	const { newCard } = req.body;

	db.Card
		.create(newCard)
		.then(createdCard => {
			res.json({ status: 200, card: createdCard });
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

	updatedInfo.forEach((card, i) => {
		db.Card
			.findByPk(card.id)
			.then(foundCard => {
				for (let key in card) {
					if (foundCard[key] !== card[key]) {
						foundCard[key] = card[key];
					}
				}
				return foundCard.save();
			})
			.then(updatedCards => {
				if (i + 1 === updatedInfo.length)
					return res.json({ status: 200, card: updatedCard });
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

	db.Card
		.findByPk(id)
		.then(foundCard => {
			for (let key in updatedInfo) {
				if (foundCard[key] !== updatedInfo[key]) {
					foundCard[key] = updatedInfo[key];
				}
			}
			return foundCard.save();
		})
		.then(updatedCard => {
			res.json({ status: 200, card: updatedCard });
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

	db.Card
		.destroy({ where: { id: id } })
		.then(foundCard => {
			res.json({ status: true, card: foundCard });
		})
		.catch(err => {
			res.json({ status: 500, error: err });
		});
});

module.exports = router;
