import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../contexts/AppContext";
import socket from "../socket/socket";
import { NavLink } from "react-router-dom";

const Home = () => {
    const navigation = useNavigate();
    const { user } = useApp();

    useEffect(() => {
        // if (!user) navigation("/welcome");
        socket.on("connect_error", (err) => {
            alert(err);
        });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-sky-500">
                Welcome {user?.username}
            </h1>
        </div>
    );
};

export default Home;
