const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require('../middleware/cloudinary.config');
const Item = require("../models/Item.model");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post('/:userId/upload', fileUploader.single("imageUrl"), async (req, res) => {
  try {
const {userId} = req.params
const newImage = req.file.path
const updatedUser = await User.findByIdAndUpdate(userId, {userImage: newImage}, {new:true})
res.status(201).json({updatedUser});
  } catch (error) {
    res.status(404).json({ message: "Photo upload unsuccessful" });
  }
})

router.post('/:itemId/upload/item', fileUploader.single("imageUrl"), async (req, res) => {
  try {
    const {itemId} = req.params
const newImage = req.file.path
const updatedItem = await Item.findByIdAndUpdate(itemId, {image: newImage}, {new:true})
res.status(201).json({updatedItem});
  } catch (error) {
    res.status(404).json({ message: "Photo upload unsuccessful" });
  }
})

module.exports = router;
