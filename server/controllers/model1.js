//===========================================
// Modules
//-------------------------------------------

const router = require("express").Router();

//===========================================
// Other Libraries
//-------------------------------------------

const algorithm = require("../lib/algorithm.js");

//===========================================
// Model
//-------------------------------------------
const Model1 = require("../models/model1.js");

//===========================================
// Routes
//-------------------------------------------

router.get("/model1", (req, res) => {
  Model1.find((err, foundModel1) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string, data: foundModel1 });
  })
});

router.get("/model1/:id", (req, res) => {
  const { id } = req.params;

  Model1.findById(id, (err, foundModel1) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string, data: foundModel1 });
  })
});

router.post("/model1", (req, res) => {
  const { newModel1 } = req.body;

  Model1.create(newModel1, (err) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string });
  })
});

router.put("/model1/:id", (req, res) => {
  const { id } = req.params;
  const { updatedModel1 } = req.body;

  Model1.findByIdAndUpdate(id, updatedModel1, (err) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string });
  });
});

router.delete("/model1/:id", (req, res) => {
  const { id } = req.params;

  Model1.findByIdAndRemove(id, (err) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string });
  });
});

module.exports = router;
