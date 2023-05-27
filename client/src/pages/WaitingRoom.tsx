import { useLocation, useParams } from "react-router-dom";
import ButtonNewMeeting from "../components/button/ButtonNewMeeting";
import RoomTimeLine from "../components/room/RoomTimeLine";
import Header from "../layouts/header/Header";
import { useEffect, useState } from "react";
import { IMeeting } from "../interfaces/room.interface";
import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

const WaitingRoom = () => {
    const [meettings, setMeettings] = useState<IMeeting[]>([]);
    const { state } = useLocation();
    const { id: roomID } = useParams();

    useEffect(() => {
        (async () => {
            const res = await axios({
                method: "GET",
                headers: {
                    Authorization: `bearer ${getAccessToken()}`,
                },
                url: `${import.meta.env.VITE_SERVER_URL}/meetting/${roomID}`,
                withCredentials: true,
            });
            setMeettings(res.data);
        })();
    }, []);

    return (
        <div className="">
            <Header>
                <ButtonNewMeeting></ButtonNewMeeting>
            </Header>
            <div className="gradient"></div>
            <div className=" app-container py-4 overflow-auto hidden-scroll-bar max-h-[calc(100vh-90px)]">
                <h2 className="text-2xl font-semibold ">{state.roomName}</h2>
                <div className="flex flex-col justify-start items-start gap-5 my-10 z-10">
                    {meettings.map((meetting, index) => {
                        return <RoomTimeLine key={index}></RoomTimeLine>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default WaitingRoom;
