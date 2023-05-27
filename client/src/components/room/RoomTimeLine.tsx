import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";
import stringAvatar from "../../utils/stringAvatar";

interface RoomTimeLineProps {}

const RoomTimeLine: React.FC<RoomTimeLineProps> = () => {
    return (
        <div className="bg-white w-full shadow-md rounded-sm p-5 z-10">
            <h3 className="font-semibold text-gray-500">
                Cuộc họp kết thúc: 1h25m
            </h3>
            <div>
                <AvatarGroup max={4}>
                    <Avatar
                        sizes="20"
                        {...stringAvatar("Minh Hieu")}
                        style={{
                            padding: 1,
                            fontSize: 14,
                            width: 30,
                            height: 30,
                        }}
                    ></Avatar>
                    <Avatar
                        sizes="20"
                        {...stringAvatar("Minh Anh")}
                        style={{
                            padding: 1,
                            fontSize: 14,
                            width: 30,
                            height: 30,
                        }}
                    ></Avatar>
                    <Avatar
                        sizes="20"
                        {...stringAvatar("Thanh Huong")}
                        style={{
                            padding: 1,
                            fontSize: 14,
                            width: 30,
                            height: 30,
                        }}
                    ></Avatar>
                    <Avatar
                        sizes="20"
                        {...stringAvatar("Thanh Huong")}
                        style={{
                            padding: 1,
                            fontSize: 14,
                            width: 30,
                            height: 30,
                        }}
                    ></Avatar>
                </AvatarGroup>
            </div>
        </div>
    );
};

export default RoomTimeLine;
