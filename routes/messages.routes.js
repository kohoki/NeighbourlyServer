const router = require("express").Router();
const Items = require("../models/Item.model");
const User = require("../models/User.model");
const Messages = require("../models/Messages.model");

// create item
router.post("/create", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const communication = await Messages.create(body);
    const appendIdToLender = await User.findByIdAndUpdate(body.lender, {$push: {messages: communication._id}});
    const appendIdToBorrower = await User.findByIdAndUpdate(body.borrower, {$push: {messages: communication._id}});
    res.status(201).json({ communication });
  } catch (error) {
    res.status(404).json({ message: "Communication was not created" });
  }
});

//display all communications on messages page from user
router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("messages");
    const messages = user.messages;
    console.log('User: ', user);
    res.status(201).json({messages});
  } catch (error) {
    res.status(404).json({ message: "Communication cannot be displayed" });
  }
})

module.exports = router;
