const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    userImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    aboutMe: {
      type: String,
    },
    addresses: {type: [Schema.Types.ObjectId], ref: 'Addresses'},
    createdItems: {type: [Schema.Types.ObjectId], ref: 'Items'},
    borrowedItems: {type: [Schema.Types.ObjectId], ref: 'Items'},
    messages: {type: [Schema.Types.ObjectId], ref: 'Messages'},
    friends: {
      type: String
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
