import { BsArrowLeftShort } from "react-icons/bs";
import { useMenu } from "../../contexts/MenuContext";
import { IMenuData, IMenuItem } from "../../interfaces/menu.interface";
import { useNavigate } from "react-router-dom";
const MenuContent = () => {
    const { history, setHistory } = useMenu();
    const topHistory = history[history.length - 1];

    const handleBack = () => {
        if (history.length <= 1) return;
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <div className="min-w-[350px]  p-2">
            {topHistory.header && (
                <div className=" w-full flex justify-between items-center border-b border-b-gray-300">
                    <button
                        className={`${
                            history.length > 1 ? "inline-block" : "hidden"
                        } w-[40px] h-[40px] flex justify-center items-center hover:bg-gray-100 rounded-full`}
                        onClick={handleBack}
                    >
                        <BsArrowLeftShort></BsArrowLeftShort>
                    </button>
                    <div className="text-center w-full font-medium">
                        {topHistory.header}
                    </div>
                </div>
            )}

            <div className="mt-3">
                {topHistory.data.map((item, index) => {
                    return <MenuItem key={index} item={item}></MenuItem>;
                })}
            </div>
        </div>
    );
};

const MenuItem = ({ item }: { item: IMenuItem }) => {
    const { setHistory, onChange } = useMenu();
    const navigation = useNavigate();
    const handleClickItem = (item: IMenuItem) => {
        if (item.children) {
            const newHistory: IMenuData = item.children;
            setHistory((prev) => [...prev, newHistory]);
        } else if (item.to) {
            navigation(item.to);
        } else {
            onChange(item);
        }
    };
    return (
        <div
            className="p-3 cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={(e) => {
                e.stopPropagation();
                handleClickItem(item);
            }}
        >
            <div className="flex justify-start items-center gap-4 md:text-base text-sm">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.title}</span>
            </div>
        </div>
    );
};

export default MenuContent;
