import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import socket from "../../socket/socket";
import Header from "../header/Header";
import Sidebar from "./Sidebar/Sidebar";

const MainLayout = () => {
    useEffect(() => {
        document.title = "TooMeet";
        socket.on("connect_error", (err: any) => {
            toast.error(err);
        });
    }, []);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            socket.auth = { access_token: JSON.parse(access_token) };
        }
        socket.connect();
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="gradient"></div>
            <div className=" app-container flex justify-start items-start gap-5">
                <Sidebar></Sidebar>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;
