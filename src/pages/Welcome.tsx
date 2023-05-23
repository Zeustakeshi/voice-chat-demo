import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import socket from "../socket/socket";

const Welcome = () => {
    const [username, setUsername] = useState<string>("");
    const { setUser } = useApp();
    const navigation = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim()) return;
        const sessionID = localStorage.getItem("sessionID");

        socket.auth = { username: username, sessionID: sessionID };

        socket.connect();
        socket.on("session", ({ sessionID, userID }) => {
            socket.auth = { sessionID };
            localStorage.setItem("sessionID", sessionID);
            setUser({ username: username, userID: userID, connected: true });
        });
        navigation("/");
    };
    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center">
            <div className="min-w-[500px]  bg-white shadow-lg rounded-md p-5">
                <h1 className="font-semibold text-2xl p-4 text-center">
                    Username
                </h1>
                <form onSubmit={handleSubmit} action="" className="w-full">
                    <input
                        className="px-5 py-3 rounded-md w-full outline-sky-500 border border-gray-200"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className="px-5 py-3 my-5 rounded-md w-full bg-sky-500 text-white font-semibold">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Welcome;
