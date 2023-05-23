import { io } from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;
