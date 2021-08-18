import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const socket = io("ws://localhost:8080", {
    autoConnect: false,
});
