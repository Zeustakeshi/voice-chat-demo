import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import axios from "axios";
import getAccessToken from "../../utils/getAccessToken";

const ButtonNewMeeting = () => {
    const navigation = useNavigate();
    const { id: roomID } = useParams();
    const { state } = useLocation();

    const handleCreateNewMeetting = async () => {
        toast.promise(
            async () => {
                const res = await axios({
                    method: "POST",
                    headers: {
                        Authorization: `beaer ${getAccessToken()}`,
                    },
                    url: `${import.meta.env.VITE_SERVER_URL}/meetting/create`,
                    data: {
                        roomID: roomID,
                    },
                });
                navigation(
                    `/room/meetting?id=${res.data.id}&roomid=${roomID}&roomname=${state.roomName}`
                );
            },
            {
                pending: "Đang tạo cuộc họp",
                success: "Tạo thành công!",
                error: "Đã có lỗi xảy ra !",
            }
        );
    };

    return (
        <>
            <Button
                onClick={handleCreateNewMeetting}
                className="px-4 py-2 text-sm rounded bg-sky-500 text-white font-semibold "
            >
                Cuộc họp mới
            </Button>
        </>
    );
};

export default ButtonNewMeeting;
