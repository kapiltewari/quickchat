import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { socket } from "../../contexts/SocketContext";
import { useEffect, useRef, useState } from "react";
import { useRoom } from "../../contexts/RoomContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Picker from "emoji-picker-react";
import IconButton from "../Ui/IconButton";

function Compose() {
    const { register, handleSubmit, reset } = useForm();
    const { room, setMessages } = useRoom();
    const { user } = useAuth();
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [cursorPosition, setCursorPosition] = useState();
    const inputRef = useRef();

    async function sendMessage(data) {
        // get text with emoji
        data.text = message;
        data.room_id = room.room_id;
        data.user_id = user.user_id;
        socket.emit("sendMessage", data);
        reset();
        setMessage("");
        setShowEmojiPicker(false);
    }

    const handleShowEmoji = () => {
        inputRef.current.focus();
        setShowEmojiPicker(!showEmojiPicker);
    };

    // emoji
    const onEmojiClick = (event, { emoji }) => {
        const ref = inputRef.current;
        ref.focus();
        const start = message.substring(0, ref.selectionStart);
        const end = message.substring(ref.selectionStart);
        const text = start + emoji + end;
        setMessage(text);
        setCursorPosition(start.length + emoji.length);
    };

    // text
    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    useEffect(() => {
        socket.on("sendMessageError", (error) => {
            toast.error(error);
        });

        socket.on("receiveMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {showEmojiPicker && (
                <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
            )}
            <Form
                onSubmit={handleSubmit(sendMessage)}
                className='d-flex flex-row align-items-center justify-content-between gap-2 mt-2 px-2 mx-2 py-2 bg-white'
                style={{
                    borderRadius: "15px",
                }}
                autoComplete='off'>
                <IconButton
                    bgColor='bg-transparent'
                    color='text-primary'
                    onClick={handleShowEmoji}>
                    <i className='bi-emoji-smile' />
                </IconButton>
                <Form.Control
                    {...register("text")}
                    type='text'
                    value={message}
                    ref={inputRef}
                    onChange={handleChange}
                    className='px-3 py-2 shadow-sm bg-white border rounded-5'
                    placeholder='Type your message here...'
                    required
                />

                <Button
                    type='submit'
                    className='shadow bg-primary border-primary'>
                    <i className='bi-cursor-fill' />
                </Button>
            </Form>
        </>
    );
}

export default Compose;
