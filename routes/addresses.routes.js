const router = require("express").Router();
const Addresses = require("../models/Adresses.model");
const User = require("../models/User.model");

router.get("/:userId", async (req, res)=> {
    try {
        const {userId} = req.params
        const userObj = await User.findById(userId).populate("addresses")
        res.status(201).json(userObj);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      }
})

router.get("/:addressId/edit", async (req, res)=> {
    try {
        const {addressId} = req.params
        console.log(addressId)
        const AddressObj = await Addresses.findById(addressId)
        console.log("Address obj", AddressObj)
        res.status(201).json(AddressObj);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      }
})

router.put("/:addressId/edit", async (req, res) => {
    try {
        const {addressId} = req.params
        const body = req.body;
        const updatedAddress = await Addresses.findByIdAndUpdate(addressId, body, {new: true})
        res.status(201).json({updatedAddress});
    } catch(err){
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
   const userId = req.params.id
   await User.findByIdAndUpdate(userId, { $push: { addresses: newAddress } }, {new: true})
    res.status(201).json({ newAddress });

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      }
    });


router.delete("/:userId/delete/:addressId", async (req, res) => {
    try {
        const userId = req.params.userId
        const addressId = req.params.addressId
        await Addresses.findByIdAndDelete(addressId)
        await User.findByIdAndUpdate(userId, { $pull: { addresses: addressId } })
        res.status(204).json('Address successfully deleted.');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })  
    }
})



module.exports = router;