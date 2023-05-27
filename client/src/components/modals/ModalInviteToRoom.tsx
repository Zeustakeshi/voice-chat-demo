import React from "react";
import Button from "../button/Button";
import CopyToClipboard from "react-copy-to-clipboard";

const ModalInviteToRoom = () => {
    return (
        <div className="min-w-[500px] bg-white shadow-lg rounded-md p-5 flex flex-col justify-center items-center">
            <h4 className="text-3xl font-semibold text-sky-500 text-center my-4">
                Mời Bạn
            </h4>
            <p className="px-5 py-3 border border-gray-200 w-full my-5">
                <span className="text-slate-600 font-semibold">Link: </span>
                <span className="text-sky-500 underline">
                    https://youtube.com
                </span>
            </p>
            <CopyToClipboard text={"xin chao pham minh hieu"}>
                <Button className="w-full px-5 py-3 rounded-md bg-sky-500 text-white font-semibold">
                    Sao chép
                </Button>
            </CopyToClipboard>
        </div>
    );
};

export default ModalInviteToRoom;
