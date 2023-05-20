import React from "react";
import { useSocket } from "../contexts/SoketContext";

interface VideoPlayerProps {}

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const { call, name, myVideo, userVideo } = useSocket();

    return (
        <div className="flex justify-between items-start w-full h-[500px] gap-5 my-4">
            {
                <VideoItem
                    muted={true}
                    name={name}
                    videoRef={myVideo}
                ></VideoItem>
            }
            {
                <VideoItem
                    muted={true}
                    name={call?.callerUser}
                    videoRef={userVideo}
                ></VideoItem>
            }
        </div>
    );
};

interface VideoItemProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    name?: string;
    muted: boolean;
}

const VideoItem: React.FC<VideoItemProps> = ({ videoRef, name, muted }) => {
    return (
        <div className="relative flex-1 border h-full">
            <span className="absolute top-3 left-3">{name || "Name"}</span>
            <video
                playsInline
                muted={muted}
                autoPlay
                ref={videoRef}
                src=""
                className="w-full h-full"
            ></video>
        </div>
    );
};

export default VideoPlayer;
