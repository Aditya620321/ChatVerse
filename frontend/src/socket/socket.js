import { io } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";  // Default to localhost
console.log("Socket connecting to:", ENDPOINT);  // Debugging

const socket = io(ENDPOINT, {
	reconnectionDelay: 1000,
	reconnection: true,
	reconnectionAttempts: 10,
	transports: ["websocket"],
	agent: false,
	upgrade: false,
	rejectUnauthorized: false,
});

export default socket;

