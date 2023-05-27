import React from "react";
import { IButton } from "../../interfaces/button.interface";

const Button: React.FC<IButton> = ({
    disabled = false,
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={`hover:bg-opacity-80 transition-all ${className} disabled:bg-opacity-75 disabled:cursor-default disabled:pointer-events-none`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
