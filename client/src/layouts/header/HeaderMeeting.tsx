import { BsChatTextFill } from "react-icons/bs";
import Button from "../../components/button/Button";
import ButtonVoiceControl from "../../components/button/ButtonVoiceControl";
import ButtonWebcamControl from "../../components/button/ButtonWebcamControl";
import moment from "moment";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonShareScreenControl from "../../components/button/ButtonShareScreenControl";
import { useCall } from "../../contexts/CallContext";

const HeaderMetting = () => {
    const navigation = useNavigate();
    const { openMicrophone, closeMicrophone } = useCall();
    return (
        <div className="py-2 shadow-sm min-h-[90px]">
            <div className="app-container flex justify-between items-center">
                <MeetingTime></MeetingTime>
                <div className="flex justify-end items-center gap-2">
                    <Tooltip title="Chat">
                        <Button className="text-slate-800 disabled:text-slate-300 p-3">
                            <BsChatTextFill></BsChatTextFill>
                        </Button>
                    </Tooltip>
                    <ButtonVoiceControl
                        onOpen={openMicrophone}
                        onClose={closeMicrophone}
                    ></ButtonVoiceControl>
                    <ButtonWebcamControl></ButtonWebcamControl>
                    <ButtonShareScreenControl></ButtonShareScreenControl>
                    <Button
                        onClick={() => navigation("/")}
                        className="px-3 py-2 rounded-md bg-red-500 text-white font-semibold text-sm"
                    >
                        Rời khỏi
                    </Button>
                </div>
            </div>
        </div>
    );
};

const MeetingTime = () => {
    return (
        <h4 className="font-medium">{moment(new Date()).format("hh:mm")}</h4>
    );
};

export default HeaderMetting;
