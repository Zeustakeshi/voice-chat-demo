import React, { useState } from "react";
import { useSocket } from "../contexts/SoketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
interface OptionProps {
    children: React.ReactNode;
}

const Options: React.FC<OptionProps> = ({ children }) => {
    const { me, callAccepted, callEnded, name, setName, endCall, callUser } =
        useSocket();
    const [idToCall, setIdToCall] = useState<string>("");
    return (
        <div>
            <div className="bg-white shadow-sm flex  justify-center items-center gap-32">
                <div className="w-full flex-1">
                    <h4 className="text-lg font-semibold">Account Info</h4>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                            className="p-2 border border-gray-200  my-4 w-full"
                        />
                        <CopyToClipboard text={me ? me : ""}>
                            <button className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-opacity-70 transition-all">
                                Copy your id
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className="w-full flex-1">
                    <h4 className="text-lg font-semibold">Make a call</h4>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <input
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                            type="text"
                            placeholder="ID to call"
                            className="p-2 border border-gray-200  my-4 w-full"
                        />
                        {callAccepted && !callEnded ? (
                            <button
                                onClick={endCall}
                                className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-opacity-70 transition-all"
                            >
                                Leave
                            </button>
                        ) : (
                            <button
                                onClick={() => callUser(idToCall)}
                                className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-opacity-70 transition-all"
                            >
                                Call
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Options;
