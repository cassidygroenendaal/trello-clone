//===========================================
// Dependencies
//-------------------------------------------

const router = require("express").Router();

//===========================================
// Other Dependencies
//-------------------------------------------

const algorithm = require("../lib/algorithm");

//===========================================
// Model
//-------------------------------------------

const db = require("../models");

//===========================================
// Routes
//-------------------------------------------
// GET: All
//-------------------------------------------

router.get("/", (req, res) => {
  db.Model1
    .findAll()
    .then((foundModel1) => {
      res.json({ success: true, message: algorithm.string, data: foundModel1 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//-------------------------------------------
// GET: One
//-------------------------------------------

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.Model1
    .findOne({ where: { id: id } })
    .then((foundModel1) => {
      res.json({ success: true, message: algorithm.string, data: foundModel1 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post("/", (req, res) => {
  const { newModel1 } = req.body;

  db.Model1
    .create(newModel1)
    .then((createdModel1) => {
      res.json({ success: true, message: algorithm.string, data: foundModel1 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//-------------------------------------------
// UPDATE: One
//-------------------------------------------

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { updatedModel1 } = req.body;

  db.Model1
    .update(updatedModel1, { where: { id: id } })
    .then((updatedModel1) => {
      res.json({ success: true, message: algorithm.string, data: foundModel1 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//-------------------------------------------
// DELETE: One
//-------------------------------------------

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.Model1
    .destroy({ where: { id: id } })
    .then((foundModel1) => {
      res.json({ success: true, message: algorithm.string, data: foundModel1 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

module.exports = router;
