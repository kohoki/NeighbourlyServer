const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require('../middleware/cloudinary.config')


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post('/upload', fileUploader.single("imageUrl"), (req, res, next) => {
  try {
console.log(req.file)
  } catch (error) {
    res.status(404).json({ message: "Photo upload unsuccessful" });
  }
})

module.exports = router;
