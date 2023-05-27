import { Server } from "socket.io";
import EventEmitter from "events";
import socketMiddleware from "./middlewares/soket.middleware.js";
import SessionStore from "./sessionStore.js";
import SignalStore from "./SignalStore.js";
class SocketManager extends EventEmitter {
    constructor() {
        super();
        this.io = null;
        this.sessionStore = new SessionStore();
        this.signalStore = new SignalStore();
    }

    initialize(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.ORIGIN_URL,
                credentials: true,
                methods: ["GET", "POST"],
            },
        });
        this.io.use(socketMiddleware);

        this.io.on("connection", (socket) => {
            this.sessionStore.saveSession(socket.id, {
                userID: socket.userID,
                username: socket.username,
            });

            socket.join(socket.userID);

            socket.emit("users", this.sessionStore.findAllSessions());

            socket.broadcast.emit("user-connected", {
                username: socket.username,
                userID: socket.userID,
            });
        });

        this.io.on("connection", (socket) => {
            console.log(`${socket.username} connected`);

            socket.on("join-room", ({ roomID, signal }) => {
                this.signalStore.newUser(
                    roomID,
                    socket.userID,
                    socket.username
                );
                socket
                    .to(socket.userID)
                    .emit(
                        "user-in-room",
                        this.signalStore.getUserInRoom(roomID)
                    );
            });

            socket.on("sending signal", ({ roomID, signal }) => {
                io.to(roomID).emit("user joined", {
                    signal: signal,
                    userID: socket.userID,
                    username: socket.username,
                });
            });

            socket.on("returning signal", ({ signal, callerID }) => {
                io.to(callerID).emit("receiving returned signal", {
                    signal: signal,
                    userID: socket.userID,
                    username: socket.username,
                });
            });

            socket.on("leave-room", (roomID, signal) => {
                this.signalStore.removeUser(socket.userID);
                socket.broadcast.to(roomID).emit("user-leave-room", {
                    userID: socket.userID,
                    username: socket.username,
                    signal: signal,
                });
            });

            socket.on("disconnect", (reason) => {
                console.log(
                    `user ${socket.username} disconnect with reason: ${reason}`
                );
                this.io.sockets.emit("user-disconnect", socket.userID);
                this.signalStore.removeUser(socket.userID);
                // socket.broadcast.to(roomID).emit("user-leave-room", {
                //     userID: socket.userID,
                //     username: socket.username,
                //     signal: signal,
                // });
                this.sessionStore.removeSession(socket.id);
            });
        });
    }
    getIO() {
        if (!this.io) {
            throw new Error("Socket.IO has not been initialized");
        }

        return this.io;
    }
}
export default SocketManager;
