import React from "react";
import { BsSendFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="">
            <Link
                to="/"
                className="flex justify-center items-center gap-2 font-semibold text-2xl text-sky-500 py-3 "
            >
                <span>TooMeet</span>
                <span>
                    <BsSendFill></BsSendFill>
                </span>
            </Link>
        </div>
    );
};

export default Logo;
