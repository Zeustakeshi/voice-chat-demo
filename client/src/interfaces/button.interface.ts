export interface IButton extends React.ComponentProps<"button"> {
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}
