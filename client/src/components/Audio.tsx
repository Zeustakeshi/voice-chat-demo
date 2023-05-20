import React from "react";
import { useSocket } from "../contexts/SoketContext";

const Audio = () => {
    const { userAudio } = useSocket();
    return (
        <div>
            <audio ref={userAudio} src="" autoPlay playsInline></audio>
        </div>
    );
};

export default Audio;
