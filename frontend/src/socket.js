import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; // backend server URL
const socket = io(ENDPOINT);

export default socket;
