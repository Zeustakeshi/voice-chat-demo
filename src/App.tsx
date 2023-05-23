import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { AppProvider } from "./contexts/AppContext";

const App = () => {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
};

export default App;
