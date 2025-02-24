const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const file = req.file ? req.file.path : null;

    const parsedDueDate = dueDate ? new Date(dueDate) : null;
    if (dueDate && isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ message: "Invalid dueDate format" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate: parsedDueDate,
      status: status || "Pending",
      user: req.user?.id,
      file,
    });

    await newTask.save();

    // Emit task creation event (if using WebSockets)
    const io = req.app.get("io");
    io.emit("taskCreated", newTask);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};
