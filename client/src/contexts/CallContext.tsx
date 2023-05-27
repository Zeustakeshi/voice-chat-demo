import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { default as Peer, default as SimplePeer } from "simple-peer";
import { RootState } from "../redux/store";
import socket from "../socket/socket";

interface CallProviderProps {
    meettingID: string;
    children: React.ReactNode;
}
interface ICallContext {
    peers: SimplePeer.Instance[];
    microphoneRef: React.RefObject<HTMLAudioElement>;
    peersRef: React.RefObject<
        {
            peerID: string;
            peer: SimplePeer.Instance;
        }[]
    >;
    openMicrophone: () => void;
    closeMicrophone: () => void;
    joinRoom: () => void;
}

const CallContext = React.createContext<ICallContext | null>(null);

const CallProvider: React.FC<CallProviderProps> = ({
    children,
    meettingID,
}) => {
    const [stream, setStream] = useState<MediaStream>();
    const [peers, setPeers] = useState<SimplePeer.Instance[]>([]);

    const { user: currentUser } = useSelector((state: RootState) => state.app);
    const microphoneRef = useRef<HTMLAudioElement>(null);
    const peersRef = useRef<
        {
            peerID: string;
            peer: SimplePeer.Instance;
        }[]
    >([]);

    useEffect(() => {
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setStream(stream);
        })();
    }, []);

    useEffect(() => {
        socket.on("user joined", ({ signal, userID }) => {
            if (!stream) return;
            const peer = addPeer(signal, userID, stream);
            peersRef.current.push({
                peerID: userID,
                peer,
            });

            setPeers((users) => [...users, peer]);
        });

        socket.on("receiving returned signal", ({ signal, userID }) => {
            const item = peersRef.current.find((p) => p.peerID === userID);
            item?.peer.signal(signal);
        });
    }, []);

    const createPeer = (
        userToSignal: string,
        callerID: string,
        stream: MediaStream
    ) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("sending signal", { userToSignal, callerID, signal });
        });

        return peer;
    };

    const addPeer = (
        incomingSignal: string,
        callerID: string,
        stream: MediaStream
    ) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    };

    const openMicrophone = async () => {
        const audioTrack = stream
            ?.getTracks()
            .find((track) => track.kind === "audio");
        if (audioTrack?.enabled === false) {
            audioTrack.enabled = true;
        }

        if (microphoneRef.current && stream)
            microphoneRef.current.srcObject = stream;
    };

    const closeMicrophone = () => {
        const audioTrack = stream
            ?.getTracks()
            .find((track) => track.kind === "audio");
        if (audioTrack?.enabled) {
            audioTrack.enabled = false;
        }
    };

    const joinRoom = () => {
        socket.emit("join-room", {
            roomID: meettingID,
        });

        socket.on("all users", (users) => {
            const peers: SimplePeer.Instance[] = [];
            users.forEach((userID: string) => {
                if (!stream) return;
                const peer: SimplePeer.Instance = createPeer(
                    userID,
                    currentUser.id,
                    stream
                );
                peersRef.current.push({
                    peerID: userID,
                    peer,
                });
                peers.push(peer);
            });
            setPeers(peers);
        });
    };

    const values = {
        peers,
        microphoneRef,
        peersRef,
        openMicrophone,
        closeMicrophone,
        joinRoom,
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
