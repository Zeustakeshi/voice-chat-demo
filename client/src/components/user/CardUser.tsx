import { Avatar } from "@mui/material";
import React from "react";
import stringAvatar from "../../utils/stringAvatar";

interface CardUserProps {
    username: string;
}

const CardUser: React.FC<CardUserProps> = ({ username }) => {
    return (
        <div className="px-2 py-3 hover:bg-gray-200 cursor-pointer rounded-lg transition-all">
            <div className="flex justify-start items-center gap-4">
                <Avatar
                    sizes="40"
                    {...stringAvatar(username)}
                    style={{ padding: 3, fontSize: 18 }}
                ></Avatar>
                <div>
                    <h4>{username}</h4>
                    <div className="text-sm text-gray-400">Đang hoạt đông</div>
                </div>
            </div>
        </div>
    );
};

export default CardUser;
