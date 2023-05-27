import { useNavigate } from "react-router-dom";
import room1 from "../../assets/room1.png";
import room2 from "../../assets/room2.png";
import room3 from "../../assets/room3.png";
import room4 from "../../assets/room4.png";
import React from "react";

const roomImages = [room1, room2, room3, room4];

interface CardRoomProps {
    roomName: string;
    roomId: string;
}

const CardRoom: React.FC<CardRoomProps> = ({ roomName, roomId }) => {
    const navigation = useNavigate();
    return (
        <div
            onClick={() =>
                navigation(`/room/${roomId}`, {
                    state: {
                        roomName: roomName,
                    },
                })
            }
            className="z-10 w-[250px] h-[250px] p-5 bg-white shadow-md hover:shadow-xl transition-all cursor-pointer rounded-md"
        >
            <div className="w-[80%] h-[80%]">
                <img
                    src={
                        roomImages[
                            Math.floor(Math.random() * roomImages.length)
                        ]
                    }
                    alt="room_image"
                    className="w-full h-full object-contain"
                />
            </div>
            <h3 className="my-3 font-semibold text-center">{roomName}</h3>
        </div>
    );
};

export default CardRoom;
