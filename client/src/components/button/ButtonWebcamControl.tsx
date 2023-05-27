import React, { useState } from "react";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import Button from "./Button";
import { Tooltip } from "@mui/material";

interface ButtonWebcamControlProps {
    disabled?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const ButtonWebcamControl: React.FC<ButtonWebcamControlProps> = ({
    disabled = false,
    onClose = () => {},
    onOpen = () => {},
}) => {
    const [openwebcam, setOpenWebcam] = useState<boolean>(false);

    const handleToggleWebcam = () => {
        if (openwebcam) {
            onOpen();
            setOpenWebcam(false);
        } else {
            onClose();
            setOpenWebcam(true);
        }
    };

    return (
        <Tooltip title="video">
            <Button
                onClick={handleToggleWebcam}
                disabled={disabled}
                className="text-slate-800 disabled:text-slate-300 p-3"
            >
                {openwebcam ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
            </Button>
        </Tooltip>
    );
};

export default ButtonWebcamControl;
