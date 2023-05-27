import { Router } from "express";
import {
    closeMeetting,
    createMeeting,
    getAllUserFromMeetting,
    getMeetting,
    joinMeetting,
} from "../controllers/meetting.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

/// Create
router.post("/create", createMeeting);

// Close
router.post("/close", closeMeetting);

// Get meeting by roomid
router.get("/:roomID", getMeetting);

// join
router.get("/:meettingID/join", joinMeetting);

// get all user from meetting
router.get("/:meettingID/users", getAllUserFromMeetting);

export default router;
