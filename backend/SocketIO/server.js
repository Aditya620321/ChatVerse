import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "https://chatverse-frontend-yla8.onrender.com"
];

let io;

function setupSocketIO(app) {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error("Socket.IO CORS policy violation"), false);
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const users = {};

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
      console.log("Connected users:", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      if (userId) {
        delete users[userId];
      }
      io.emit("getOnlineUsers", Object.keys(users));
    });
  });

  return { server, io };
}

const getReceiverSocketId = (receiverId) => {
  return io ? io.sockets?.sockets?.get(receiverId) : null;
};
z
export { setupSocketIO, getReceiverSocketId };
