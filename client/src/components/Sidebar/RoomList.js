import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import NoRooms from "./NoRooms";
import CreateRoom from "./CreateRoom";
import { getRoom } from "../../api/rooms";
import { useRoom } from "../../contexts/RoomContext";
import { useAuth } from "../../contexts/AuthContext";
import { socket } from "../../contexts/SocketContext";

function RoomList({ rooms }) {
    const { room, setRoom } = useRoom();
    const { token, user } = useAuth();

    async function getCurrentRoom(room_id) {
        await getRoom(room_id, token)
            .then(async (res) => {
                setRoom(res.data.data);
                socket.emit("joinRoom", room_id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div
            className='flex-grow-1 d-flex flex-column'
            style={{
                maxHeight: "80%",
            }}>
            <div className='d-flex justify-content-between align-items-center py-3 px-1'>
                <p className='fw-bold'>All Rooms</p>
                <CreateRoom />
            </div>

            <div className='overflow-auto border rounded'>
                {!rooms.length ? (
                    <NoRooms />
                ) : (
                    <ListGroup as='ul' variant='flush' className='h-100'>
                        {rooms.map((item) => (
                            <ListGroupItem
                                action
                                // active={
                                //     room?.room_id === item.room_id && "active"
                                // }
                                key={item.room_id}
                                className={`py-4 d-flex align-items-center gap-1 ${
                                    room?.room_id === item.room_id && "active"
                                }`}
                                as='a'
                                onClick={() => getCurrentRoom(item.room_id)}>
                                <p className='fw-bold'>{item.name}</p>
                                {(item.owner_id === item.user_id ||
                                    item.owner_id === user.user_id) && (
                                    <div className='bg-transparent text-secondary rounded px-2 py-1'>
                                        <i className='bi-gem'></i>
                                    </div>
                                )}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </div>
        </div>
    );
}

export default RoomList;
