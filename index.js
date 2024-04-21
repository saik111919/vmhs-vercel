var express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./Routes/routes');
const { wss } = require('./Routes/WebSocket/WebSocket');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { getClientAndCollection } = require('./Routes/DataBase/MangoDB');
dotenv.config();
const app = express();

// DATABASE
getClientAndCollection();

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Optionally, you can also handle the "disconnected" event
db.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});

// Middleware
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use("/api", router);

// HTTP server creation
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Upgrade HTTP server to handle WebSocket requests
server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = request.url;

  if (pathname === '/api/callsocket') {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  } else {
    // Handle regular HTTP requests here if needed
    socket.destroy();
  }
});



