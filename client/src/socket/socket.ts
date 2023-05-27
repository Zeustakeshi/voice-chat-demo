import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;
