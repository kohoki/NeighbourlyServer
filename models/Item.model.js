const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    itemName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
    },
    borrowed: {
        type: Boolean,
        default: false,
    },
    borrower: {type: [Schema.Types.ObjectId], ref: 'User'},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;