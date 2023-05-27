import React, { useState } from "react";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import Button from "./Button";
import { Tooltip } from "@mui/material";

interface ButtonShareScreenControlProps {
    disabled?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const ButtonShareScreenControl: React.FC<ButtonShareScreenControlProps> = ({
    disabled = false,
    onOpen = () => {},
    onClose = () => {},
}) => {
    const [openShareScreen, setOpenShareScreen] = useState<boolean>(false);

    const handleToggleShareScreen = () => {
        if (openShareScreen) {
            onClose();
            setOpenShareScreen(false);
        } else {
            onOpen();
            setOpenShareScreen(true);
        }
    };

    return (
        <Tooltip title="Share Screen">
            <Button
                onClick={handleToggleShareScreen}
                disabled={disabled}
                className="text-slate-800 disabled:text-slate-300 p-3 text-lg"
            >
                {openShareScreen ? <MdScreenShare /> : <MdStopScreenShare />}
            </Button>
        </Tooltip>
    );
};

export default ButtonShareScreenControl;
