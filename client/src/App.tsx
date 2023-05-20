import Audio from "./components/Audio";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { SocketProvider } from "./contexts/SoketContext";

// import React from "react";
const App = () => {
    return (
        <>
            <div className="w-full bg-white shadow-md sticky top-0">
                <div className="app-container py-4 bg-white">
                    <h1 className="font-semibold text-xl text-indigo-700">
                        Call And Video Chat
                    </h1>
                </div>
            </div>
            <div className="app-container">
                <SocketProvider>
                    {/* <VideoPlayer /> */}
                    <Audio></Audio>
                    <Options>
                        <Notifications />
                    </Options>
                </SocketProvider>
            </div>
        </>
    );
};

export default App;
