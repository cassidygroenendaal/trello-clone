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

const Model1 = require("../models/model1");

//===========================================
// Routes
//-------------------------------------------
// GET: All
//-------------------------------------------

router.get("/", (req, res) => {
  Model1.find((err, foundModel1) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string, data: foundModel1 });
  })
});

//-------------------------------------------
// GET: One
//-------------------------------------------

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Model1.findById(id, (err, foundModel1) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string, data: foundModel1 });
  })
});

//-------------------------------------------
// CREATE: One
//-------------------------------------------

router.post("/", (req, res) => {
  const { newModel1 } = req.body;

  Model1.create(newModel1, (err) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string });
  })
});

//-------------------------------------------
// UPDATE: One
//-------------------------------------------

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { updatedModel1 } = req.body;

  Model1.findByIdAndUpdate(id, updatedModel1, (err) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string });
  });
});

//-------------------------------------------
// DELETE: One
//-------------------------------------------

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Model1.findByIdAndRemove(id, (err) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, message: algorithm.string });
  });
});

module.exports = router;
