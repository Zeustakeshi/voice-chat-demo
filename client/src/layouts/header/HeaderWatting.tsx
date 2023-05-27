import { Avatar } from "@mui/material";
import Logo from "../../components/Logo";
import stringAvatar from "../../utils/stringAvatar";

const HeaderWatting = () => {
    return (
        <div className="z-40 sticky top-0 bg-white shadow-sm ">
            <div className="app-container py-2 flex justify-between items-center">
                <Logo></Logo>
                <div className="cursor-pointer flex justify-end items-center gap-4">
                    <Avatar
                        {...stringAvatar("Minh Hieu")}
                        style={{
                            padding: 3,
                            fontSize: 18,
                        }}
                    ></Avatar>
                </div>
            </div>
        </div>
    );
};

export default HeaderWatting;
