const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const addressesSchema = new Schema(
  {
    nameOfAddress: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Addresses = model("Addresses", addressesSchema);

module.exports = Addresses;