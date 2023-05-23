import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useApp } from "../contexts/AppContext";
import socket from "../socket/socket";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import ButtonCall from "../components/ButtonCall";
import { CallProvider } from "../contexts/CallContext";

interface IMessage {
    from: string;
    mess: string;
}

const Chat = () => {
    const { user } = useApp();
    const navigation = useNavigate();
    const { id } = useParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    useEffect(() => {
        if (!user?.username) navigation("/welcome");
        if (!id) navigation("/");

        socket.on("receive-message", (from, mess) => {
            setMessages((prev) => [...prev, { from, mess }]);
        });
        return () => {
            socket.off("receive-message");
        };
    }, []);

    useEffect(() => {
        setMessages([]);
    }, [id]);

    return (
        <div>
            <div className="my-5 flex justify-between items-center flex-col">
                <h1 className="text-2xl font-semibold text-sky-500">
                    {user?.username}
                </h1>
                <div>
                    <CallProvider>
                        <ButtonCall idUserToCall={id}></ButtonCall>
                    </CallProvider>
                </div>
            </div>
            <div className="min-h-[500px]">
                {messages.map((mess, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex justify-start items-center gap-3 ${
                                mess.from === "me"
                                    ? "bg-blue-500"
                                    : "bg-gray-200"
                            }`}
                        >
                            <span>{mess.from}</span>
                            <span>{mess.mess}</span>
                        </div>
                    );
                })}
            </div>
            <InputMess setMessages={setMessages}></InputMess>
        </div>
    );
};

interface InputMessProps {
    setMessages: React.Dispatch<SetStateAction<IMessage[]>>;
}

const InputMess: React.FC<InputMessProps> = ({ setMessages }) => {
    const [mess, setMess] = useState<string>("");
    const [typing, setTyping] = useState<{ from: string; isTyping: boolean }>({
        from: "no",
        isTyping: false,
    });
    const { id } = useParams();
    const { user } = useApp();
    const debouce = useDebounce(mess, 500);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (mess.trim()) {
            socket.emit("typing", user?.username, id, true);
            timerRef.current = setTimeout(() => {
                socket.emit("typing", user?.username, id, false);
            }, 2000);
        } else {
            socket.emit("typing", user?.username, id, false);
        }
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [debouce]);

    useEffect(() => {
        socket.on("typing", (from, isTyping) => {
            setTyping({
                from,
                isTyping,
            });
        });
        return () => {
            socket.off("typing");
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!mess.trim()) return;
        socket.emit("send-message", user?.username, id, mess);
        setMessages((prev) => [...prev, { from: "me", mess }]);
        setMess("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center flex-col"
        >
            {typing.isTyping && (
                <span className="font-semibold text-sky-500">
                    {typing.from} is typing....
                </span>
            )}
            <input
                value={mess}
                onChange={(e) => setMess(e.target.value)}
                type="text"
                className="min-w-[500px] px-5 py-3 bg-slate-200 "
                placeholder="mess"
            />
        </form>
    );
};

export default Chat;
