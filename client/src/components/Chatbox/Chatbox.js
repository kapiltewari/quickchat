import Compose from "./Compose";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { motion } from "framer-motion";
import { useRoom } from "../../contexts/RoomContext";

function Chatbox() {
    const { messages, room } = useRoom();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                ease: "easeOut",
            }}
            className='d-flex flex-column bg-white justify-content-center min-vh-100 p-4'
            style={{
                maxHeight: "100vh",
            }}>
            <div
                className='bg-light rounded border d-flex flex-column pb-3'
                style={{
                    height: "90vh",
                    position: "relative",
                }}>
                <div className='px-2 py-1 my-2 mx-2 bg-white rounded border'>
                    <strong>{room.name}</strong>
                </div>
                {messages.length ? (
                    <ScrollToBottom className='flex-grow-1  custom-scroll overflow-auto'>
                        <div className='px-3'>
                            {messages.map((message) => (
                                <Message
                                    key={message.message_id}
                                    message={message}
                                />
                            ))}
                        </div>
                    </ScrollToBottom>
                ) : (
                    <div className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
                        <strong>No messages.</strong>
                    </div>
                )}
                <Compose />
            </div>
        </motion.div>
    );
}

export default Chatbox;
