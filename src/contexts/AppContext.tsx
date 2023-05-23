import React, { useContext, useEffect, useState } from "react";
import socket from "../socket/socket";

interface AppProviderProps {
    children: React.ReactNode;
}

interface IUser {
    userID: string;
    username: string;
    connected: boolean;
}
interface IAppContext {
    users: IUser[];
    user?: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const AppContext = React.createContext<IAppContext | null>(null);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser>();
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        socket.on("users", (users) => {
            setUsers(users);
        });

        socket.on("user-connected", (data) => {
            setUsers((prev) => {
                if (prev.find((user) => user.userID === data.userID)) {
                    return prev.map((user) => {
                        if (user.userID === data.userID) {
                            return data;
                        }
                        return user;
                    });
                }
                return [...prev, data];
            });
        });
        socket.on("user-disconnect", (data) => {
            setUsers((prev) => {
                return prev.map((user) => {
                    if (user.userID === data) {
                        return {
                            ...user,
                            connected: false,
                        };
                    }
                    return user;
                });
            });
        });

        return () => {
            socket.off("user-connected");
            socket.off("disconnect");
        };
    }, []);

    const values = { users, user, setUser };
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useApp = () => {
    const context = useContext(AppContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useApp must be used within AppProvider");
    }
    return context;
};

export { useApp, AppProvider };
