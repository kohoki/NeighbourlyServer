const router = require("express").Router();
const Items = require("../models/Item.model");
const User = require("../models/User.model");
const Messages = require("../models/Messages.model");

// create communication
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
    const messagesOfUser = await Messages.find({$or: [{lender: id}, {borrower: id}]}).populate({path: "item", select: ["itemName", "image"]}).populate({path: "lender", select: "username"}).populate({path: "borrower", select: "username"}).populate({path: "communication.userId", select: "username"});
    console.log(messagesOfUser);
    res.status(201).json({messagesOfUser});
  } catch (error) {
    res.status(404).json({ message: "Communication cannot be displayed" });
  }
})

//Update communication array by pushing new message inside
router.post("/:messageId/update", async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const body = req.body;
    const addMessage = await Messages.findByIdAndUpdate(messageId, {$push: { communication: body }}, {new: true});
    res.status(201).json({addMessage});
  } catch (error) {
    res.status(404).json({ message: "Message could not be added to array" });
  }
})


module.exports = router;
