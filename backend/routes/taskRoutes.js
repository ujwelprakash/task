const express = require("express");
const path = require("path");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ✅ Create a Task with File Upload
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null; // Store file path

    const newTask = new Task({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: status || "Pending",
      fileUrl, // 🔹 Keep consistent naming
      user: req.userId,
    });

    await newTask.save();
    res.status(201).json(newTask); // 🔹 Ensure response includes fileUrl
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all Tasks for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks); // 🔹 Ensure fileUrl is included
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks." });
  }
});

// ✅ Update a Task (including file update)
router.put("/:id", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const updatedData = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      status,
    };

    if (req.file) {
      updatedData.fileUrl = `/uploads/${req.file.filename}`; // 🔹 Ensure consistency
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updatedData,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask); // 🔹 Ensure response includes fileUrl
  } catch (error) {
    res.status(500).json({ error: "Error updating task." });
  }
});

// ✅ Delete a Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task." });
  }
});

// ✅ Serve Uploaded Files Correctly
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
