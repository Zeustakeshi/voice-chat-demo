import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import chatRouter from "./routers/chat.router.js";
import roomRouter from "./routers/room.router.js";
import userRouter from "./routers/user.router.js";
import meettingRouter from "./routers/meetting.router.js";
import SocketManager from "./socketManager.js";

dotenv.config();
const app = express();

const server = http.createServer(app);

const socketManager = new SocketManager();
socketManager.initialize(server);

// Middleware
app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/chats", chatRouter);
app.use("/api/meetting", meettingRouter);

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`server is runing on port ${port}`);
});
