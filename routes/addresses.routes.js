const router = require("express").Router();
const Addresses = require("../models/Adresses.model");
const User = require("../models/User.model");

router.get("/:id", async (req, res)=> {
    try {
        const userId = req.params.id
        const userObj = await User.findById(userId).populate("addresses")
        res.status(201).json(userObj);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      }
})

router.post('/:id/create', async (req, res) => {
    try {
    const { nameOfAddress, number, street, postalCode, city, creator } = req.body;
   
    if (street === '' || postalCode === '' || nameOfAddress === '') {
      res.status(400).json({ message: "Provide missing details" });
      return;
    }

    const newAddress = await Addresses.create({ nameOfAddress, number, street, postalCode, city, creator })
    console.log("HEY", newAddress.id)
   const userId = req.params.id
   await User.findByIdAndUpdate(userId, { $push: { addresses: newAddress } }, {new: true})
    res.status(201).json({ newAddress });

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      }
    });


router.delete("/:id/delete", async (req, res) => {
    try {
        const addressId = req.params.id
        const deletedAddress = await Addresses.findByIdAndDelete(addressId)
        res.status(201).json(deletedAddress);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })  
    }
})



module.exports = router;