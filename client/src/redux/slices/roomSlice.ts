import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../interfaces/room.interface";

interface RoomState {
    rooms: IRoom[];
}

const initialState: RoomState = {
    rooms: [],
};

const roomSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {
        setRooms(state, action: PayloadAction<IRoom[]>) {
            state.rooms = action.payload;
        },
    },
});

export const { setRooms } = roomSlice.actions;
export default roomSlice.reducer;
