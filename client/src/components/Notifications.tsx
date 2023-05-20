import React from "react";
import { useSocket } from "../contexts/SoketContext";

interface NotificationProps {}

const Notifications: React.FC<NotificationProps> = () => {
    const { call, callAccepted, answerCall } = useSocket();
    return (
        <div>
            {call?.isReceivedCall && !callAccepted && (
                <div>
                    <h4>{call.callerUser} ..........</h4>
                    <button
                        onClick={answerCall}
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-opacity-70 transition-all"
                    >
                        Answer call
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notifications;
