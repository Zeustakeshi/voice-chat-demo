import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

interface SocketProviderProps {
    children: React.ReactNode;
}

interface CallUser {
    isReceivedCall: boolean;
    signal: string;
    from: string;
    callerUser: string;
}
interface ISocketContext {
    stream?: MediaStream;
    me?: string;
    call?: CallUser;
    callAccepted: boolean;
    callEnded: boolean;
    name?: string;
    myVideo: React.RefObject<HTMLVideoElement>;
    userVideo: React.RefObject<HTMLVideoElement>;
    userAudio: React.RefObject<HTMLAudioElement>;
    answerCall: () => void;
    callUser: (id: any) => void;
    endCall: () => void;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
    withCredentials: true,
});

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [stream, setStream] = useState<MediaStream>();
    const [me, setMe] = useState<string>("");
    const [call, setCall] = useState<CallUser>();
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [callEnded, setCallEnded] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const myVideo = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>(null);
    const userAudio = useRef<HTMLAudioElement>(null);
    const connectionRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    // video: true,
                    audio: true,
                });

                setStream(stream);
                if (myVideo.current) myVideo.current.srcObject = stream;
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        socket.on("me", (id) => {
            setMe(id);
        });
        socket.on("calluser", ({ from, name: callerUser, signal }) => {
            setCall({ from, signal, callerUser, isReceivedCall: true });
        });
    }, [socket]);

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("answercall", { signal: data, to: call?.from });
        });

        peer.on("stream", (stream) => {
            if (userVideo.current) userVideo.current.srcObject = stream;
            if (userAudio.current) userAudio.current.srcObject = stream;
        });

        if (call?.signal) peer.signal(call.signal);
    };

    const callUser = (id: any) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            socket.emit("calluser", {
                userCall: id,
                signal: data,
                from: me,
                name: name,
            });
        });

        peer.on("stream", (stream) => {
            if (userVideo.current) userVideo.current.srcObject = stream;
            if (userAudio.current) userAudio.current.srcObject = stream;
        });

        socket.on("callacceped", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        if (connectionRef?.current) connectionRef.current = peer;
    };

    const endCall = () => {
        console.log("call ended");
        setCallEnded(true);
        window.location.reload();
        connectionRef.current.destroy();
    };

    const values = {
        stream,
        me,
        call,
        callAccepted,
        callEnded,
        name,
        myVideo,
        userVideo,
        userAudio,
        callUser,
        answerCall,
        endCall,
        setName,
    };
    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const context = useContext(SocketContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};

export { useSocket, SocketProvider };
