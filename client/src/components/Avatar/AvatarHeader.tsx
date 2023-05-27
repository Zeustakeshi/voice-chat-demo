import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMenuData, IMenuItem } from "../../interfaces/menu.interface";
import { logout } from "../../redux/slices/appSlice";
import { RootState } from "../../redux/store";
import stringAvatar from "../../utils/stringAvatar";
import Menu from "../menu/Menu";
import MenuContentWrapper from "../menu/MenuContentWrapper";
import MenuContent from "./MenuContent";

const userMenuData: IMenuData = {
    data: [
        {
            type: "info",
            title: "Thông tin",
        },
        {
            type: "logout",
            title: "Đăng xuất",
        },
    ],
};

const AvatarHeader = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.app);
    const handleChange = (item: IMenuItem) => {
        if (item.type === "logout") {
            dispatch(logout());

            navigation("/auth/login");
        }
    };
    return (
        <Menu
            data={userMenuData}
            onChange={handleChange}
            label={
                <div className="cursor-pointer flex justify-end items-center gap-4">
                    <p className="sm:inline-block hidden">{user.username}</p>
                    <Avatar
                        sizes="40"
                        {...stringAvatar(user.username)}
                        style={{ padding: 3, fontSize: 18 }}
                    ></Avatar>
                </div>
            }
        >
            <MenuContentWrapper className="absolute top-[110%] -right-[2px]  bg-white rounded-md shadow-[rgba(0,0,0,0.1)_0px_10px_20px]">
                <MenuContent></MenuContent>
            </MenuContentWrapper>
        </Menu>
    );
};

export default AvatarHeader;
