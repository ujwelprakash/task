const mongoose = require("mongoose");

// Define the schema for Task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  fileUrl: { // Change this to fileUrl
    type: String, // Stores file path
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

