import React, { useState, useEffect } from "react";
import IconButton from "../Ui/IconButton";
import { Modal, Form, InputGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { getUsersRequest } from "../../api/user";
import { socket } from "../../contexts/SocketContext";
import { useRoom } from "../../contexts/RoomContext";
import { toast } from "react-toastify";

function AddParticipantsModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const { room, setParticipants } = useRoom();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function addParticipantToTheRoom(user_id) {
        socket.emit("addParticipantToTheRoom", {
            user_id: user_id,
            room_id: room.room_id,
        });
    }

    function searchHandler(value) {
        setSearchTerm(value);
        if (searchTerm !== "") {
            const newUserList = users.filter((room) => {
                return Object.values(room)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });

            setSearchResults(newUserList);
        } else {
            setSearchResults(users);
        }
    }

    useEffect(() => {
        async function getUsers() {
            await getUsersRequest(token).then((res) => {
                setUsers(res.data.data);
            });
        }

        getUsers();
    }, [token]);

    useEffect(() => {
        socket.on("addParticipantToTheRoomSuccess", (data) => {
            setParticipants((prevParticipants) => [...prevParticipants, data]);
            toast.success("User successfully added to the room.");
        });

        socket.on("addParticipantToTheRoomAlreadyAddedError", () => {
            toast.info("User already added to the room.");
        });

        socket.on("addParticipantToTheRoomError", () => {
            toast.error("Server error.");
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className='d-flex'>
            <IconButton
                color='text-primary'
                bgColor='bg-transparent'
                onClick={handleShow}>
                <i className='bi-plus-circle-fill'></i>
            </IconButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold fs-5'>
                        Add Participants
                    </Modal.Title>
                </Modal.Header>
                <Form
                    className='d-flex flex-row align-items-center justify-content-between px-2 py-2'
                    autoComplete='off'
                    onSubmit={handleSubmit}>
                    <InputGroup className='rounded border'>
                        <Form.Control
                            type='text'
                            className='py-2 border-0 bg-light'
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={(e) => searchHandler(e.target.value)}
                        />
                    </InputGroup>
                </Form>
                <Modal.Body
                    className='d-flex flex-column gap-2 pb-4 overflow-auto'
                    style={{
                        maxHeight: "444px",
                    }}>
                    {searchTerm === "" ? (
                        <>
                            {users.map((user) => (
                                <div
                                    key={user.user_id}
                                    className='d-flex justify-content-between align-items-center rounded border px-3 py-2'>
                                    <div className='d-flex flex-column'>
                                        <strong>
                                            {user.first_name} {user.last_name}
                                        </strong>
                                        <small className='text-muted'>
                                            {user.email}
                                        </small>
                                    </div>
                                    <IconButton
                                        onClick={() =>
                                            addParticipantToTheRoom(
                                                user.user_id
                                            )
                                        }>
                                        <i className='bi-plus'></i>
                                    </IconButton>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {searchResults.map((user) => (
                                <div
                                    key={user.user_id}
                                    className='d-flex justify-content-between align-items-center rounded border px-4 py-3'>
                                    <div className='d-flex flex-column'>
                                        <strong>
                                            {user.first_name} {user.last_name}
                                        </strong>
                                        <small className='text-muted'>
                                            {user.email}
                                        </small>
                                    </div>
                                    <IconButton
                                        onClick={() =>
                                            addParticipantToTheRoom(
                                                user.user_id
                                            )
                                        }>
                                        <i className='bi-plus'></i>
                                    </IconButton>
                                </div>
                            ))}
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddParticipantsModal;
