const mongoose = require("mongoose");
const app = require("./app");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
const MONGO_URI =
process.env.MONGODB_URI || "mongodb+srv://lisaphoeberalf:NzTgv9m9T1gOK5oO@neighbourly.94w5zfe.mongodb.net/?retryWrites=true&w=majority";

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
