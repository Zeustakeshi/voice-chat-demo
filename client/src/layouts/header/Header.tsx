import React from "react";
import AvatarHeader from "../../components/Avatar/AvatarHeader";
import Logo from "../../components/Logo";

interface HeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="z-40 sticky top-0 bg-white shadow-sm ">
            <div className="app-container py-2 flex justify-between items-center">
                <Logo></Logo>
                <div className="flex justify-end items-center gap-5">
                    {children}
                    <AvatarHeader></AvatarHeader>
                </div>
            </div>
        </header>
    );
};

export default Header;
