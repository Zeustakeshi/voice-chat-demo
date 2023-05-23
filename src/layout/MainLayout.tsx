import { NavLink, Outlet } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const MainLayout = () => {
    const { users } = useApp();
    return (
        <div className="flex justify-start items-start p-10 gap-5">
            <div className="flex flex-col justify-start items-start min-w-[200px] border">
                {users.map((user, index) => {
                    return (
                        <NavLink
                            to={`/chat/${user?.userID}`}
                            key={index}
                            className={({ isActive }) => {
                                return `block text-xl w-full hover:bg-gray-200  ${
                                    isActive ? "bg-gray-200" : ""
                                } transition px-5 py-3 `;
                            }}
                        >
                            <div>{user?.username}</div>
                            <div
                                className={` text-sm font-semibold ${
                                    user?.connected
                                        ? " text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {user?.connected ? "online" : "offline"}
                            </div>
                        </NavLink>
                    );
                })}
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;
