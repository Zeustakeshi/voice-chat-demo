import React, { useContext, useEffect, useState } from "react";
import socket from "../socket/socket";
import { IUserOnline } from "../interfaces/user.interface";

interface SocketProviderProps {
    children: React.ReactNode;
}

interface ISocketContext {
    userOnline: IUserOnline[];
    setUserOnline: React.Dispatch<React.SetStateAction<IUserOnline[]>>;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [userOnline, setUserOnline] = useState<IUserOnline[]>([]);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            socket.auth = { access_token: JSON.parse(access_token) };
        }
        socket.connect();
    }, []);

    useEffect(() => {
        socket.on("users", (users) => {
            setUserOnline(users);
        });

        socket.on("user-connected", (data) => {
            setUserOnline((prev) => [...prev, data]);
        });

        socket.on("user-disconnect", (userID) => {
            setUserOnline((prev) =>
                prev.filter((user) => user.userID !== userID)
            );
        });

        return () => {
            socket.off("users");
            socket.off("user-connected");
            socket.off("user-disconnect");
        };
    }, []);

    const values = {
        userOnline,
        setUserOnline,
    };
    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const context = useContext(SocketContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};

export { useSocket, SocketProvider };
