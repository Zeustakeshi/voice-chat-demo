import ChatModel from "../models/chat.model.js";

const chatModel = new ChatModel();

export const createChat = async (req, res) => {
    const { roomID, message } = req.body;
    const userID = req.userID;

    if (!roomID || !message) {
        return res.status(400).json("Missing data for this action!");
    }

    try {
        const newMessage = await chatModel.newChat(userID, roomID, message);
        return res.status(200).json(newMessage);
    } catch (error) {
        return res.status(500).json(error);
    }
};
