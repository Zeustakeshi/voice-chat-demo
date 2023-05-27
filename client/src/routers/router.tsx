import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";
import MainLayout from "../layouts/main/MainLayout";
import MeettingLayout from "../layouts/meeting/MeettingLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Meeting from "../pages/Meeting";
import Register from "../pages/Register";
import WaitingRoom from "../pages/WaitingRoom";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { user } = useSelector((state: RootState) => state.app);

    if (!user?.id && !user.username) {
        return <Navigate to="/auth/login"></Navigate>;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout></MainLayout>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
        ],
    },
    {
        path: "/room",

        element: (
            <ProtectedRoute>
                <MeettingLayout />
            </ProtectedRoute>
        ),

        children: [
            {
                path: ":id",
                element: <WaitingRoom></WaitingRoom>,
            },
            {
                path: "meetting",
                element: <Meeting></Meeting>,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
        ],
    },
]);
export default router;
