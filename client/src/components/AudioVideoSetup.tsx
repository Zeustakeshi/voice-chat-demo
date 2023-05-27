import { Avatar } from "@mui/material";
import React from "react";
import stringAvatar from "../utils/stringAvatar";
import Button from "./button/Button";
import ButtonVoiceControl from "./button/ButtonVoiceControl";
import ButtonWebcamControl from "./button/ButtonWebcamControl";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCall } from "../contexts/CallContext";

interface AudioVideoSetupProps {
    onCancel: () => void;
    onContinue: () => void;
}

const AudioVideoSetup: React.FC<AudioVideoSetupProps> = ({
    onCancel,
    onContinue,
}) => {
    const { user } = useSelector((state: RootState) => state.app);
    const { openMicrophone, closeMicrophone } = useCall();
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="gradient"></div>

            <div className="z-10 w-[500px] h-[500px] bg-white p-5 pt-10 rounded-md shadow-md">
                <div className="w-full flex justify-start flex-col items-center gap-5">
                    <Avatar
                        {...stringAvatar(user.username)}
                        style={{
                            width: 150,
                            height: 150,
                        }}
                    ></Avatar>
                    <p className="font-semibold text-xl">{user.username}</p>
                </div>
                <div className="flex justify-center items-center gap-5 my-5">
                    <ButtonVoiceControl
                        onClose={closeMicrophone}
                        onOpen={openMicrophone}
                    />
                    <ButtonWebcamControl />
                </div>
                <div className="flex justify-center items-center gap-5">
                    <Button
                        className="px-5 py-3 rounded-lg bg-red-500 text-white font-medium"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onContinue}
                        className="px-5 py-3 rounded-lg bg-sky-500 text-white font-medium"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AudioVideoSetup;
