import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createChat } from "../controllers/chat.controller.js";

const router = Router();
router.use(authMiddleware);

// add chat
router.post("/", createChat);

export default router;
