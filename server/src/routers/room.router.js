import { Router } from "express";
import {
    createRoom,
    getRooms,
    joinRoom,
    leaveRoom,
} from "../controllers/room.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.use(authMiddleware);
// Get room by userid
router.get("/", getRooms);
/// Create room
router.post("/create", createRoom);
// Join room
router.post("/join/:roomID", joinRoom);
// Leave room
router.post("/leave/:roomID", leaveRoom);

export default router;
