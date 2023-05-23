import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
    {
        path: "/welcome",
        element: <Welcome></Welcome>,
    },
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/chat/:id",
                element: <Chat></Chat>,
            },
        ],
    },
]);

export default router;
