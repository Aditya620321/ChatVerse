import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { setupSocketIO } from "./SocketIO/server.js";

dotenv.config();

const app = express();

import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://chatverse-frontend-yla8.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"), false);
    }
  },
  credentials: true,
}));

app.options("*", cors()); // Handle preflight requests for all routes


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");

    const { server } = setupSocketIO(app);
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });


  import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build folder statically in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
