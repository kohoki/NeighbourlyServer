const router = require("express").Router();
const Items = require("../models/Item.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// create item
router.post("/:userId", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const item = await Items.create(body);
    const {userId} = req.params
    await User.findByIdAndUpdate(userId, { $push: { createdItems: item } }, {new: true})
    res.status(201).json({ item });
  } catch (error) {
    res.status(404).json({ message: "Item was not created" });
  }
});

// find item by item_id

router.get("/borrow/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Items.findById(id).populate("creator");
    res.status(201).json({ item });
  } catch (error) {
    res.status(404).json({ message: "Item not found" });
  }
});

// find item by user_id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedItems = await Items.find({ creator: id });
    res.status(201).json({ foundedItems });
  } catch (error) {
    res.status(404).json({ message: "No items found" });
  }
});

// find all items
router.get("/", async (req, res, next) => {
  try {
    const foundedItems = await Items.find({ borrowed: false }).populate(
      "creator"
    );
    res.status(201).json({ foundedItems });
  } catch (error) {
    res.status(404).json({ message: "No items found" });
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
router.delete("/:userId/delete/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    await Items.findByIdAndDelete(itemId);
    await User.findByIdAndUpdate(userId, { $pull: { createdItems: itemId } })
    res.status(204).json('Item successfully deleted.');
  } catch (error) {
    res.status(404).json({ message: "Item has not been deleted" });
  }
});

//Update borrowed status of item
router.put("/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundItem = await Items.findById(id);
    if (foundItem.borrowed === true) {
      const changeStatus = await Items.findByIdAndUpdate(id, {borrowed: false}, {new: true})
    } else {
      const changeStatus = await Items.findByIdAndUpdate(id, {borrowed: true}, {new: true})
    }
    res.status(200).json({changeStatus})
  } catch (error) {
    res.status(404).json({ message: "Borrowed status cannot be updated" });
  }
})

module.exports = router;
