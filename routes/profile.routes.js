const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log("AAAAA", user);
    res.status(201).json({ user });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    res.json({ updatedUser });
  } catch (error) {
    res.status(404).json({ message: "Update isnt working" });
  }
});

module.exports = router;
