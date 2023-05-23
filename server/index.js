import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import SessionStore from "./sessionStore.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
    },
});
const sessionStore = new SessionStore();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
io.use((socket, next) => {
    const { username, sessionID } = socket.handshake.auth;
    if (sessionID) {
        const session = sessionStore.findSession(sessionID);
        if (session) {
            socket.sessionID = sessionID;
            socket.userID = session.userID;
            socket.username = session.username;
            return next();
        }
    }
    if (!username) {
        next(new Error("Invalid username"));
    }
    socket.sessionID = uuidv4();
    socket.userID = uuidv4();
    socket.username = username;

    next();
});

io.on("connection", (socket) => {
    sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: true,
    });

    socket.emit("session", {
        sessionID: socket.sessionID,
        userID: socket.userID,
    });

    socket.join(socket.userID);

    const users = [];
    sessionStore.findAllSessions().forEach((session) => {
        users.push({
            userID: session.userID,
            username: session.username,
            connected: session.connected,
        });
    });
    socket.emit("users", users);

    socket.broadcast.emit("user-connected", {
        username: socket.username,
        userID: socket.userID,
        connected: true,
    });
});

io.on("connection", (socket) => {
    console.log(`a user connection ${socket.username}`);

    /* PUBLIC*/

    /* PRIVATE*/

    socket.on("call-user", ({ to, signal, from, isVideoOn }) => {
        console.log(`${from} call ${to}`);
        io.to(to).emit("user-call", { signal, from, isVideoOn });
    });

    socket.on("answer-call", ({ to, signal }) => {
        console.log(`answer to ${to} user`);

        io.to(to).emit("call-acceped", signal);
    });

    socket.on("typing", (from, to, isTyping) => {
        socket.broadcast.to(to).emit("typing", from, isTyping);
    });

    socket.on("send-message", (from, to, mess) => {
        socket.broadcast.to(to).emit("receive-message", from, mess);
    });

    /// User disconnect
    socket.on("disconnect", (reason) => {
        console.log(
            `user ${
                sessionStore.findSession(socket.sessionID).username
            } disconnect with reason: ${reason}`
        );
        io.sockets.emit("user-disconnect", socket.userID);
        sessionStore.saveSession(socket.sessionID, {
            userID: socket.userID,
            username: socket.username,
            connected: false,
        });
    });
});

const port = 4000;
server.listen(port, () => {
    console.log(`server is runing on port ${port}`);
});
