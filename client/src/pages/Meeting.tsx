import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AudioVideoSetup from "../components/AudioVideoSetup";
import ButtonInviteToRoom from "../components/button/ButtonInviteToRoom";
import CardUserMeeting from "../components/user/CardUserMeeting";
import { CallProvider, useCall } from "../contexts/CallContext";
import HeaderMetting from "../layouts/header/HeaderMeeting";

const Meeting = () => {
    const [showSetup, setShowSetup] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const meettingID = searchParams.get("id");

    if (!meettingID) return <></>;
    return (
        <CallProvider meettingID={meettingID}>
            <>
                {showSetup ? (
                    <SetupMeetting setShowSetup={setShowSetup}></SetupMeetting>
                ) : (
                    <MainMeetting></MainMeetting>
                )}
            </>
        </CallProvider>
    );
};

const SetupMeetting = ({
    setShowSetup,
}: {
    setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { joinRoom } = useCall();
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();
    const roomID = searchParams.get("roomid");
    const roomName = searchParams.get("roomname");
    const handeJoinMeetting = async () => {
        toast.promise(
            async () => {
                // await axios({
                //     method: "GET",
                //     headers: {
                //         Authorization: `beaer ${getAccessToken()}`,
                //     },
                //     url: `${
                //         import.meta.env.VITE_SERVER_URL
                //     }/meetting/${meettingID}/join`,
                //     withCredentials: true,
                // });

                // socket.emit("join-room",)
                joinRoom();
                setShowSetup(false);
            },
            {
                pending: "Đang kết nối",
                success: "Kết nối thành công",
                error: "Kết nối thất bại",
            }
        );
    };
    return (
        <AudioVideoSetup
            onContinue={handeJoinMeetting}
            onCancel={() =>
                navigation(`/room/${roomID}`, {
                    state: {
                        roomName: roomName,
                    },
                })
            }
        ></AudioVideoSetup>
    );
};

const MainMeetting = () => {
    const { peers } = useCall();
    return (
        <div>
            <div className="gradient"></div>
            <HeaderMetting></HeaderMetting>
            <div className="relative z-10 app-container max-h-[calc(100vh-90px)] overflow-auto hidden-scroll-bar">
                <div className="flex flex-wrap justify-center items-center gap-5 my-10 mb-32">
                    {peers.map((peer, index) => {
                        return (
                            <CardUserMeeting
                                peer={peer}
                                key={index}
                                size="xl"
                            ></CardUserMeeting>
                        );
                    })}
                </div>
                <ButtonInviteToRoom></ButtonInviteToRoom>
            </div>
        </div>
    );
};

export default Meeting;
