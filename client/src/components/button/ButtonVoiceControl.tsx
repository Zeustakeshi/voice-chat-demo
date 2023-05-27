import React, { useState } from "react";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import Button from "./Button";
import { Tooltip } from "@mui/material";

interface ButtonVoiceControlProps {
    disabled?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const ButtonVoiceControl: React.FC<ButtonVoiceControlProps> = ({
    disabled = false,
    onOpen = () => {},
    onClose = () => {},
}) => {
    const [openVoice, setOpenVoice] = useState<boolean>(false);

    const handleToggleVoice = () => {
        if (openVoice) {
            onClose();
            setOpenVoice(false);
        } else {
            onOpen();
            setOpenVoice(true);
        }
    };

    return (
        <Tooltip title="Mic">
            <Button
                onClick={handleToggleVoice}
                disabled={disabled}
                className="text-slate-800 disabled:text-slate-300 p-3"
            >
                {openVoice ? <BsFillMicFill /> : <BsFillMicMuteFill />}
            </Button>
        </Tooltip>
    );
};

export default ButtonVoiceControl;
