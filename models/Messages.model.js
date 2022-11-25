const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const messagesSchema = new Schema(
  {
    item: { type: [Schema.Types.ObjectId], ref: "Item" },
    lender: { type: [Schema.Types.ObjectId], ref: "User" },
    borrower: { type: [Schema.Types.ObjectId], ref: "User" },
    communication: [
      {
        message: String,
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          timestamps: true,
        },
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Messages = model("Messages", messagesSchema);

module.exports = Messages;
