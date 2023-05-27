import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserOnline } from "../../interfaces/user.interface";

interface AppState {
    user: IUser;
    userOnlines: IUserOnline[];
}

const getInitUser = () => {
    const user = localStorage.getItem("current-user");
    if (user) return JSON.parse(user);
    return {
        username: "",
        email: "",
        id: "",
    };
};

const initialState: AppState = {
    user: getInitUser(),
    userOnlines: [],
};

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        logout(state) {
            localStorage.clear();
            state.user = {
                username: "",
                email: "",
                id: "",
            };
        },

        setUserOnlines(state, action: PayloadAction<IUserOnline[]>) {
            state.userOnlines = action.payload;
        },

        addUserOnline(state, action: PayloadAction<IUserOnline>) {
            state.userOnlines.push(action.payload);
        },
        removeUserOnline(state, action: PayloadAction<string>) {
            state.userOnlines = state.userOnlines.filter(
                (user) => user.userID !== action.payload
            );
        },
    },
});

export const {
    setUser,
    logout,
    setUserOnlines,
    addUserOnline,
    removeUserOnline,
} = appSlice.actions;
export default appSlice.reducer;
