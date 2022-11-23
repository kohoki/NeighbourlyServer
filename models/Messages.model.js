const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const messagesSchema = new Schema(
  {
    message: {
        type: String,
        required: true
    },
    sender:{type: [Schema.Types.ObjectId], ref: 'User'},
    receiver: {type: [Schema.Types.ObjectId], ref: 'User'},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Messages = model("Messages", messagesSchema);

module.exports = Messages;