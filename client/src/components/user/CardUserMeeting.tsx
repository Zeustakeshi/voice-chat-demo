import { Avatar, Tooltip } from "@mui/material";
import React, { useEffect, useRef } from "react";
import stringAvatar from "../../utils/stringAvatar";
import SimplePeer from "simple-peer";

type SizeType = "sm" | "md" | "lg" | "xl" | number;

interface CardUserMeetingProps {
    size?: SizeType;
    className?: string;
    peer: SimplePeer.Instance;
}

const sizes = {
    sm: 150,
    md: 200,
    lg: 250,
    xl: 300,
};

const sizeToNumber = (size: SizeType) => {
    if (typeof size === "number") return size;
    return sizes[size];
};

const CardUserMeeting: React.FC<CardUserMeetingProps> = ({
    size = "md",
    className = "",
    peer,
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        peer.on("stream", (stream) => {
            if (audioRef.current) audioRef.current.srcObject = stream;
        });
    }, []);

    return (
        <div
            style={{
                width: sizeToNumber(size),
                height: sizeToNumber(size),
            }}
            className={`relative bg-white  flex justify-center items-center break-inside-avoid rounded-lg border border-slate-300 bg-white/20 bg-clip-padding p-6 backdrop-blur-lg backdrop-filter md:w-[360px] h-fit  ${className}`}
        >
            <Tooltip title="Minh Hieu">
                <Avatar
                    {...stringAvatar("Minh Hieu")}
                    style={{
                        width: sizeToNumber(size) * 0.5,
                        height: sizeToNumber(size) * 0.5,
                    }}
                ></Avatar>
            </Tooltip>
            <h5 className="absolute bottom-2 left-2 text-[12px] text-slate-600">
                Minh Hieu
            </h5>
            <audio playsInline autoPlay ref={audioRef}></audio>
        </div>
    );
};

export default CardUserMeeting;
