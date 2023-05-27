import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userModel = new UserModel();

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json("missing data for this action!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    try {
        const user = await userModel.register(username, email, hashPassword);
        const access_token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.SECRET_KEY
        );
        const { password: pw, ...userForClient } = user;
        return res.status(200).json({
            access_token,
            user: userForClient,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("missing data for this action");
    }

    try {
        const user = await userModel.findByEmail(email);
        if (!user) return res.status(404).json("user not found!");
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).json("Invalid password");

        const access_token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.SECRET_KEY
        );
        const { password: pw, ...userForClient } = user;
        return res.status(200).json({
            access_token,
            user: userForClient,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
