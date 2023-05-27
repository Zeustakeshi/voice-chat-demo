import { useEffect, useState } from "react";
import Button from "../components/button/Button";
import CardRoom from "../components/room/CardRoom";
import { IRoom } from "../interfaces/room.interface";
import axios from "axios";
import getAccessToken from "../utils/getAccessToken";
import imgEmtyRoom from "../assets/animation.gif";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [rooms, setRooms] = useState<IRoom[]>([]);

    useEffect(() => {
        (async () => {
            const res = await axios({
                method: "GET",
                headers: {
                    Authorization: `bearer ${getAccessToken()}`,
                },
                url: `${import.meta.env.VITE_SERVER_URL}/rooms`,
                withCredentials: true,
            });
            setRooms(res.data);
        })();
    }, []);

    return (
        <div className="flex-1 w-full py-5 max-h-[calc(100vh-90px)] overflow-auto hidden-scroll-bar ">
            <div className="my-8 flex flex-wrap gap-5 mx-auto justify-center">
                {rooms.length ? (
                    rooms.map((room, index) => {
                        return (
                            <CardRoom
                                key={index}
                                roomName={room.name}
                                roomId={room.id}
                            ></CardRoom>
                        );
                    })
                ) : (
                    <div>
                        <img src={imgEmtyRoom} alt="" />
                    </div>
                )}
            </div>
            <RoomOption></RoomOption>
        </div>
    );
};

const RoomOption = () => {
    return (
        <div className="flex justify-center items-center gap-8">
            <JoinWithRoomCode></JoinWithRoomCode>
            <CreateNewRoom></CreateNewRoom>
        </div>
    );
};

const JoinWithRoomCode = () => {
    return (
        <div className="w-[450px] h-[250px] p-5 bg-white shadow-md hover:shadow-xl transition-all cursor-pointer rounded-md">
            <h4 className="text-center font-semibold my-3">Tham gia bằng mã</h4>
            <form className="w-full">
                <input
                    type="text"
                    placeholder="#"
                    className="w-full  px-4 py-2 outline-sky-500 border border-gray-200"
                />
                <Button className="bg-sky-500 text-white font-semibold rounded w-full p-2 my-3">
                    Tham gia
                </Button>
            </form>
        </div>
    );
};

const CreateNewRoom = () => {
    const [roomName, setRoomName] = useState<string>("");
    const navigation = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomName.trim()) toast("Tên phòng không hợp lệ");

        toast.promise(
            async () => {
                const res = await axios({
                    method: "POST",
                    headers: {
                        Authorization: `bearer ${getAccessToken()}`,
                    },
                    url: `${import.meta.env.VITE_SERVER_URL}/rooms/create`,
                    data: {
                        name: roomName,
                    },
                    withCredentials: true,
                });
                navigation(`/room/${res.data.id}`);
            },
            {
                success: "Tạo phòng thành công!",
                pending: "Đang tạo phòng",
                error: "Tạo phòng thất bại",
            }
        );
    };

    return (
        <div className="w-[450px] h-[250px] p-5 bg-white shadow-md hover:shadow-xl transition-all cursor-pointer rounded-md">
            <h4 className="text-center font-semibold my-3">Tạo Phòng mới</h4>
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    type="text"
                    placeholder="Tên phòng"
                    className="w-full px-4 py-2 outline-sky-500 border border-gray-200"
                />
                <Button className="bg-sky-500 text-white font-semibold rounded w-full p-2 my-3">
                    Tạo mới
                </Button>
            </form>
        </div>
    );
};

export default Home;
