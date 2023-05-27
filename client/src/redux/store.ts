import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import roomSlice from "./slices/roomSlice";
// ...

export const store = configureStore({
    reducer: {
        app: appSlice,
        room: roomSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
