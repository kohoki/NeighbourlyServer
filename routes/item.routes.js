const router = require("express").Router();
const Items = require("../models/Item.model");
const User = require("../models/User.model");
const fileUploader = require('../middleware/cloudinary.config')

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// create item
router.post("/:userId/create", fileUploader.single("imageUrl"), async (req, res) => {
  try {
    const {itemName, description, availability, creator} = req.body;
    const image = req.file.path
    const item = await Items.create(
      {
        itemName, image, description, availability, creator
      }
    );
    const {userId} = req.params
    await User.findByIdAndUpdate(userId, { $push: { createdItems: item } }, {new: true})
    res.status(201).json({ item });
  } catch (error) {
    res.status(404).json({ message: "Item was not created" });
  }
});

router.post("/test", (req, res) => {
  console.log("we did it!", req.body)
})

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
router.put("/:itemId/edit", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const body = req.body;
    const updatedItem = await Items.findByIdAndUpdate(itemId, body, { new: true });
    res.status(201).json({ updatedItem });
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
    const body = req.body;
    const borrowerId = body.id;
    const foundItem = await Items.findById(id);
    console.log("Found Item: ", foundItem);
    if (foundItem.borrowed === true) {
      const changeStatusToFalse = await Items.findByIdAndUpdate(id, {borrowed: false, $pull: {borrower: borrowerId}}, {new: true})
      res.status(200).json({changeStatusToFalse})
    } else {
      const changeStatusToTrue = await Items.findByIdAndUpdate(id, {borrowed: true, $push: {borrower: borrowerId}}, {new: true})
      res.status(200).json({changeStatusToTrue});
    }
  } catch (error) {
    res.status(404).json({ message: "Borrowed status cannot be updated" });
  }
})

//find all items which are currently borrowed by the user
router.get("/:id/borrowed", async (req, res, next) => {
  try {
    const { id } = req.params;
    const findItems = await Items.find({borrower: id});
    console.log("Items: ", findItems);
    res.status(201).json({ findItems });
  } catch (error) {
    res.status(404).json({ message: "Borrowed items cannot be found" });
  }
})

module.exports = router;
