import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const socket = io(`${process.env.REACT_APP_API_URL}`, {
    autoConnect: false,
});
