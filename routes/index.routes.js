const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require('../middleware/cloudinary.config')


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

router.post('/:itemId/uploaditem', fileUploader.single("imageUrl"), async (req, res) => {
  try {
const newImage = req.file.path
res.status(201).json(newImage);
  } catch (error) {
    res.status(404).json({ message: "Photo upload unsuccessful" });
  }
})

module.exports = router;
