import { v4 as uuidv4 } from "uuid";
import RoomModel from "../models/room.model.js";

const roomModel = new RoomModel();

export const createRoom = async (req, res) => {
    const { name } = req.body;
    const userID = req.userID;
    try {
        const newRoom = await roomModel.create(uuidv4(), name, userID);
        return res.status(200).json(newRoom);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const endRoom = async (req, res) => {
    const { id } = req.body;
    try {
        const room = await roomModel.end(id);
        if (!room) return res.status(409).json("Can not end this room");
        return res.status(200).json(room);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const joinRoom = async (req, res) => {
    const { roomID } = req.params;
    const userID = req.userID;
    try {
        await roomModel.join(userID, roomID);
        return res.json("join successful");
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const leaveRoom = async (req, res) => {
    const { roomID } = req.params;
    const userID = req.userID;
    try {
        await roomModel.leave(userID, roomID);
        return res.status(200).json("leave successful!");
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getRooms = async (req, res) => {
    const userID = req.userID;
    try {
        const rooms = await roomModel.getRoomByUserID(userID);
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json(error);
    }
};
