require("dotenv").config(); // Load environment variables

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;

// ✅ Debugging: Check if environment variables are set correctly
console.log("✅ Loaded JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not Set");
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Not Set");

if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  console.error("❌ ERROR: Missing environment variables. Check your .env file!");
  process.exit(1); // Stop server if critical env variables are missing
}

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if database connection fails
  });

// ✅ Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Ensure form-data parsing
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// ✅ Debugging Middleware - Logs Every Request
app.use((req, res, next) => {
  console.log(`🟡 Incoming ${req.method} request to: ${req.url}`);
  console.log("🔹 Headers:", req.headers);
  console.log("🔹 Body:", req.body);
  next();
});

// ✅ WebSockets: Attach io instance to app for real-time updates
app.set("io", io);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log("✅ Client connected via WebSockets");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
