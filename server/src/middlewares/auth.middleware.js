import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) return res.status(403).json(err);
        req.userID = data.id;
        req.userEmail = data.email;
        req.username = data.username;
        return next();
    });
};

export default authMiddleware;
