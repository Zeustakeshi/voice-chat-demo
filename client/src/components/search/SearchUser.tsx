import React from "react";

const SearchUser = () => {
    return (
        <div>
            <h3 className="font-semibold">Đang hoạt động</h3>
            <form className="my-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="px-3 py-2 outline-sky-500 border border-gray-200 transition-all"
                />
            </form>
        </div>
    );
};

export default SearchUser;
