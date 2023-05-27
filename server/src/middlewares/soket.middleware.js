import jwt from "jsonwebtoken";

const socketMiddleware = (socket, next) => {
    const { access_token } = socket.handshake.auth;
    if (!access_token) return next(new Error("Unauthorized!"));

    jwt.verify(access_token, process.env.SECRET_KEY, (err, data) => {
        if (err) return next(new Error(err));

        socket.username = data.username;
        socket.email = data.email;
        socket.userID = data.id;
        return next();
    });
};

export default socketMiddleware;
