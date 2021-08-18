import { createContext, useContext, useEffect, useState } from "react";
import { getRoomParticipantsRequest } from "../api/participant";
import { useAuth } from "./AuthContext";
import { getMessagesRequest } from "../api/message";
import { getRoomsByParticipantIDRequest } from "../api/rooms";

const RoomContext = createContext();
export const useRoom = () => useContext(RoomContext);

function RoomContextProvider({ children }) {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [onlineParticipants, setOnlineParticipants] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);

    const { token } = useAuth();

    useEffect(() => {
        async function getRoomParticipants() {
            if (room) {
                await getRoomParticipantsRequest(room.room_id, token)
                    .then((res) => {
                        setParticipants(res.data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

        getRoomParticipants();
    }, [room]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        async function getMessages() {
            if (room) {
                await getMessagesRequest(room.room_id, token)
                    .then((res) => {
                        setMessages(res.data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

        getMessages();
    }, [room, token]);

    useEffect(() => {
        async function getRoomsByParticipantID() {
            await getRoomsByParticipantIDRequest(token)
                .then((res) => {
                    setRooms(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getRoomsByParticipantID();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setRooms(rooms);
    }, [rooms]);

    const value = {
        room,
        setRoom,
        participants,
        setParticipants,
        messages,
        setMessages,
        rooms,
        setRooms,
        onlineParticipants,
        setOnlineParticipants,
    };

    return (
        <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
    );
}

export default RoomContextProvider;
