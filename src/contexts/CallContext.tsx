import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socket from "../socket/socket";
import { useApp } from "./AppContext";
interface CallProviderProps {
    children: React.ReactNode;
}

interface CallUser {
    isReceivedCall: boolean;
    signal: string;
    from: string;
    isVideoOn: boolean;
}

interface ICallContext {
    stream?: MediaStream;
    videoRef?: React.RefObject<HTMLVideoElement>;
    userVideoRef?: React.RefObject<HTMLVideoElement>;
    microphoneRef?: React.RefObject<HTMLAudioElement>;
    userMicrophoneRef?: React.RefObject<HTMLAudioElement>;
    callAccepted: boolean;
    isVideoOn: boolean;
    call?: CallUser;
    setIsVideoOn: React.Dispatch<React.SetStateAction<boolean>>;
    answerCall: () => void;
    openVideo: () => void;
    openMicrophone: () => void;
    closeVideo: () => void;
    closeMicrophone: () => void;
    handleCall: (to: string) => void;
}

const CallContext = React.createContext<ICallContext | null>(null);

const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
    const [stream, setStream] = useState<MediaStream>();
    const [call, setCall] = useState<CallUser>();
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const microphoneRef = useRef<HTMLAudioElement>(null);
    const userVideoRef = useRef<HTMLVideoElement>(null);
    const userMicrophoneRef = useRef<HTMLAudioElement>(null);
    const connectionRef = useRef<any>(null);

    const { user } = useApp();

    useEffect(() => {
        const getStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            setStream(stream);
        };
        getStream();

        socket.on("user-call", ({ signal, from }) => {
            setCall({ from, signal, isReceivedCall: true, isVideoOn });
        });

        return () => {
            socket.off("user-call");
        };
    }, []);

    const openVideo = async () => {
        const videoTrack = stream
            ?.getTracks()
            .find((track) => track.kind === "video");
        if (videoTrack?.enabled === false) {
            videoTrack.enabled = true;
        }
        // setStream()
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    };

    const openMicrophone = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        setStream(stream);
        if (microphoneRef.current) microphoneRef.current.srcObject = stream;
    };

    const closeVideo = () => {
        const videoTrack = stream
            ?.getTracks()
            .find((track) => track.kind === "video");
        if (videoTrack?.enabled) {
            videoTrack.enabled = false;
        }
    };

    const closeMicrophone = () => {
        stream?.getAudioTracks().forEach((track) => track.stop());
    };

    const handleCall = async (to: string) => {
        try {
            setStream(stream);

            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream,
            });

            peer.on("signal", (data) => {
                socket.emit("call-user", {
                    to: to,
                    signal: data,
                    from: user?.userID,
                    isVideoOn: isVideoOn,
                });
            });

            peer.on("stream", (stream) => {
                if (userVideoRef.current)
                    userVideoRef.current.srcObject = stream;
                if (userMicrophoneRef.current)
                    userMicrophoneRef.current.srcObject = stream;
            });

            socket.on("call-acceped", (signal) => {
                console.log("user chap nhan call");
                peer.signal(signal);
                setCallAccepted(true);
            });
            if (connectionRef?.current) connectionRef.current = peer;
        } catch (error) {
            console.log(error);
        }
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("answer-call", { signal: data, to: call?.from });
        });

        peer.on("stream", (stream) => {
            if (userVideoRef.current) userVideoRef.current.srcObject = stream;
            if (userMicrophoneRef.current)
                userMicrophoneRef.current.srcObject = stream;
        });
        if (call?.signal) peer.signal(call.signal);
    };

    const values = {
        videoRef,
        microphoneRef,
        userMicrophoneRef,
        userVideoRef,
        stream,
        callAccepted,
        call,
        isVideoOn,
        setIsVideoOn,
        answerCall,
        openVideo,
        openMicrophone,
        closeVideo,
        closeMicrophone,
        handleCall,
    };
    return (
        <CallContext.Provider value={values}>{children}</CallContext.Provider>
    );
};

const useCall = () => {
    const context = useContext(CallContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useCall must be used within CallProvider");
    }
    return context;
};

export { useCall, CallProvider };
