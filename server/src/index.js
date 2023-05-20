import http from "http";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN_URL,
        credentials: true,
        methods: ["GET", "POST"],
    },
});
global._io = io;

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));

io.on("connection", (socket) => {
    console.log("an user connection with id: " + socket.id);
    socket.emit("me", socket.id);

    socket.on("disconnect", (reason) => {
        socket.broadcast.emit("callended", reason);
    });

    socket.on("calluser", ({ userCall, signal, from, name }) => {
        io.to(userCall).emit("calluser", { signal, from, name });
    });

    socket.on("answercall", ({ to, signal }) => {
        io.to(to).emit("callacceped", signal);
    });
});

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
