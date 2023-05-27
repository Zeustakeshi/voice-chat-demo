import MeettingModel from "../models/meetting.model.js";
import { v4 as uuidv4 } from "uuid";

const meettingModel = new MeettingModel();

export const createMeeting = async (req, res) => {
    const { roomID } = req.body;

    try {
        const newMeetting = await meettingModel.createMeeting(uuidv4(), roomID);
        return res.status(200).json(newMeetting);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const closeMeetting = async (req, res) => {
    const { meettingID, roomID } = req.body;
    if (!meettingID || !roomID) {
        return res.status(400).json("Missing data for this action");
    }
    try {
        const meetting = await meettingModel.closeMeetting(meettingID, roomID);
        return res.status(200).json(meetting);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getMeetting = async (req, res) => {
    const { roomID } = req.params;

    try {
        const meettings = await meettingModel.getMeettingByRoomID(roomID);
        return res.status(200).json(meettings);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const joinMeetting = async (req, res) => {
    const userID = req.userID;
    const { meettingID } = req.params;

    try {
        await meettingModel.join(userID, meettingID);
        return res.status(200).json("join meetting successful");
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getAllUserFromMeetting = async (req, res) => {
    const { meettingID } = req.params;

    try {
        const users = await meettingModel.getAllUserFromMeetting(meettingID);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};
