const router = require("express").Router();
const Items = require("../models/Item.model");
const User = require("../models/User.model");
const Messages = require("../models/Messages.model");

// create item
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const communication = await Messages.create(body);
    res.status(201).json({ communication });
  } catch (error) {
    res.status(404).json({ message: "Communication was not created" });
  }
});

module.exports = router;
