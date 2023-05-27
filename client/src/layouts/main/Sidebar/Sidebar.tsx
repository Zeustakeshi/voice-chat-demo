import { useDispatch, useSelector } from "react-redux";
import SearchUser from "../../../components/search/SearchUser";
import CardUser from "../../../components/user/CardUser";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import socket from "../../../socket/socket";
import {
    addUserOnline,
    removeUserOnline,
    setUserOnlines,
} from "../../../redux/slices/appSlice";

const Sidebar = () => {
    const { userOnlines } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on("users", (users) => {
            dispatch(setUserOnlines(users));
        });

        socket.on("user-connected", (data) => {
            dispatch(addUserOnline(data));
        });

        socket.on("user-disconnect", (userID) => {
            dispatch(removeUserOnline(userID));
        });

        return () => {
            socket.off("users");
            socket.off("user-connected");
            socket.off("user-disconnect");
        };
    }, []);

    return (
        <div className="hidden md:block hidden-scroll-bar min-w-[400px] h-[calc(100vh-90px)] shadow-md overflow-auto p-5 bg-white z-10">
            <SearchUser></SearchUser>
            <div className="">
                {userOnlines.map((user, index) => {
                    return (
                        <CardUser
                            username={user.username}
                            key={index}
                        ></CardUser>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
