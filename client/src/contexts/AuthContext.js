import { createContext, useContext, useEffect, useState } from "react";
import { profileRequest } from "../api/auth";
import { socket } from "./SocketContext";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getUser() {
            await profileRequest(token)
                .then((res) => {
                    setUser(res.data.data);
                    setLoggedIn(true);
                    setIsOnline(true);
                    socket.emit("setOnline", {
                        user_id: res.data.data.user_id,
                    });
                })
                .catch(() => {
                    localStorage.clear();
                });
        }

        getUser();
    }, [token]);

    const value = {
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        token,
        isOnline,
        setIsOnline,
        onlineUsers,
        setOnlineUsers,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;
