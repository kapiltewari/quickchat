import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const socket = io("http://127.0.0.1", {
    autoConnect: false,
});
