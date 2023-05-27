import { useEffect } from "react";
import { BsSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const AuthLayout = () => {
    const { user } = useSelector((state: RootState) => state.app);
    const navigation = useNavigate();

    useEffect(() => {
        if (user.username && user.id) navigation("/");
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center ">
            <div className="gradient"></div>
            <div className="z-10 flex flex-col gap-5 bg-white p-5 shadow-md rounded-md min-w-[500px]">
                <Link
                    to="/"
                    className="flex justify-center items-center gap-2 font-semibold text-sky-500 py-3 text-4xl "
                >
                    <span>TooMeet</span>
                    <span>
                        <BsSendFill></BsSendFill>
                    </span>
                </Link>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;
