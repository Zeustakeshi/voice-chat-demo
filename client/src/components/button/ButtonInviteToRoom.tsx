import { FiUserPlus } from "react-icons/fi";
import Button from "./Button";
import { useState } from "react";
import Modal from "../modals/Modal";
import ModalInviteToRoom from "../modals/ModalInviteToRoom";

const ButtonInviteToRoom = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <Button
                onClick={() => setShowModal(true)}
                className="fixed bottom-5 right-5 px-4 py-2 rounded-full bg-sky-500 text-white font-semibold flex justify-center items-center gap-3"
            >
                <FiUserPlus></FiUserPlus>
                Mời
            </Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalInviteToRoom></ModalInviteToRoom>
            </Modal>
        </>
    );
};

export default ButtonInviteToRoom;
