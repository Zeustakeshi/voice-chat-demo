import React, { useRef } from "react";
import { IMenuData, IMenuItem } from "../../interfaces/menu.interface";
import MenuLabel from "./MenuLabel";
import { MenuProvider } from "../../contexts/MenuContext";

interface IMenuProps {
    children: React.ReactNode;
    label: React.ReactNode;
    data: IMenuData;
    onChange?: (item: IMenuItem) => void;
}

const Menu: React.FC<IMenuProps> = ({
    children,
    label,
    data,
    onChange = () => {},
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <MenuProvider menuRef={menuRef} data={data} onChange={onChange}>
            <div ref={menuRef} className="relative">
                <MenuLabel>{label}</MenuLabel>
                {children}
            </div>
        </MenuProvider>
    );
};

export default Menu;
