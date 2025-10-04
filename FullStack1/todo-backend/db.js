const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:ZE1B5Kiwfit3uF81@appdb.cdmoc.mongodb.net/todo"
    );
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

const todoSchema = new Schema({
  name: { type: String, required: true },
});

const Todo = mongoose.model("todo",todoSchema);


module.exports = {connectDB,Todo}
