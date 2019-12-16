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
  db.Model2
    .findAll()
    .then((foundModel2) => {
      res.json({ success: true, message: algorithm.string, data: foundModel2 });
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

  db.Model2
    .findOne({ where: { id: id } })
    .then((foundModel2) => {
      res.json({ success: true, message: algorithm.string, data: foundModel2 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post("/", (req, res) => {
  const { newModel2 } = req.body;

  db.Model2
    .create(newModel2)
    .then((createdModel2) => {
      res.json({ success: true, message: algorithm.string, data: createdModel2 });
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
  const { updatedModel2 } = req.body;

  db.Model2
    .update(updatedModel2, { where: { id: id } })
    .then((updatedModel2) => {
      res.json({ success: true, message: algorithm.string, data: updatedModel2 });
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

  db.Model2
    .destroy({ where: { id: id } })
    .then((foundModel2) => {
      res.json({ success: true, message: algorithm.string, data: foundModel2 });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

module.exports = router;
