import React, { useState } from "react";
import IconButton from "../Ui/IconButton";
import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { createRoomRequest } from "../../api/rooms.js";
import { toast } from "react-toastify";
import { useRoom } from "../../contexts/RoomContext";

function CreateRoom() {
    const [show, setShow] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { token } = useAuth();
    const { setRooms } = useRoom();

    async function addNewRoom(data) {
        await createRoomRequest(data, token)
            .then((res) => {
                setRooms((prevRooms) => [...prevRooms, res.data.data]);
                reset();
                handleClose();
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    switch (error.response.status) {
                        case 404:
                            toast.error("User does not exist.");
                            break;
                        default:
                            toast.error("Something went wrong.");
                    }
                } else {
                    toast.error("Something went wrong.");
                }
            });
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
                        Create A New Room
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='pb-4'>
                    <div className='d-flex flex-column'>
                        <Form
                            autoComplete='off'
                            onSubmit={handleSubmit(addNewRoom)}>
                            <Form.Control
                                {...register("name")}
                                type='text'
                                className='px-3 py-2 mb-3 bg-white border rounded'
                                placeholder='Enter a room name'
                                required
                            />
                            <Button
                                type='submit'
                                className='w-100 bg-primary border-primary'>
                                Create
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateRoom;
