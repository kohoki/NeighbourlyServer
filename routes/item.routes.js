const router = require("express").Router();
const User = require("../models/User.model");
const Items = require("../models/Item.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// create item
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const item = await Items.create(body);
    res.status(201).json({ item });
  } catch (error) {
    res.status(404).json({ message: "Item was not created" });
  }
});

// update item
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedItem = await Items.findByIdAndUpdate(id, body, { new: true });
    res.json({ updatedItem });
  } catch (error) {
    res.status(404).json({ message: "Item has not been changed" });
  }
});

// delete item
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedItem = await Items.findByIdAndDelete(id);

    res.json(deletedItem);
  } catch (error) {
    res.status(404).json({ message: "Item has not been deleted" });
  }
});

module.exports = router;
