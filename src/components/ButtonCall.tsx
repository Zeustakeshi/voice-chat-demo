import React from "react";
import { useParams } from "react-router-dom";
import { useCall } from "../contexts/CallContext";

interface ButtonCallProps {
    idUserToCall: string | undefined;
}

const ButtonCall: React.FC<ButtonCallProps> = () => {
    const { id } = useParams();
    const callX = useCall();
    const handleToggleVideo = () => {
        if (callX.isVideoOn) {
            callX.closeVideo();
            callX.setIsVideoOn(false);
        } else {
            callX.openVideo();
            callX.setIsVideoOn(true);
        }
    };
    return (
        <div>
            <button
                onClick={handleToggleVideo}
                className="px-3 py-1 bg-green-500 text-white"
            >
                {callX.isVideoOn ? "close" : "open"} video
            </button>
            <button
                onClick={() => id && callX.handleCall(id)}
                className="transition-all hover:bg-opacity-80 px-5 py-3 rounded-md bg-sky-500 text-white font-semibold"
            >
                Gọi ngay
            </button>
            {callX.call?.isReceivedCall && !callX.callAccepted && (
                <div className="call-answer">
                    <div>{callX.call.from} is caling</div>
                    <button
                        onClick={callX.answerCall}
                        className="px-4 py-2 bg-sky-500 text-white"
                    >
                        Answer call
                    </button>
                </div>
            )}
            <div className="flex flex-col justify-between items-center">
                <div>
                    <p>My video</p>
                    <div className="w-[300px] h-[300px] border border-slate-500">
                        <video
                            className="w-full h-full"
                            ref={callX.videoRef}
                            autoPlay
                        ></video>
                    </div>
                </div>
                <div>
                    <p>{callX.call?.from} Video</p>
                    <div className="w-[300px] h-[300px] border border-slate-500">
                        {/* {callX.call?.isVideoOn && ( */}
                        <video
                            className="w-full h-full"
                            ref={callX.userVideoRef}
                            autoPlay
                        ></video>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonCall;
