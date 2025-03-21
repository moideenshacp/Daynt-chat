import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import { setupSocket } from "./services/socketService";

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Setup Socket.io event listeners
setupSocket(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
