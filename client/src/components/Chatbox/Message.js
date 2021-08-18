import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import ReactEmoji from "react-emoji";

const Message = ({ message }) => {
    const { user } = useAuth();

    // const date = format(new Date(message.created_at));
    const date = new Date(message.created_at).toLocaleDateString("en-IN", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    });
    const time = new Date(message.created_at).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const own = message.user_id === user.user_id;

    return (
        <div className='d-flex flex-column'>
            <div
                className={
                    !own ? "my-2 align-self-start" : "my-2 align-self-end"
                }
                style={{
                    maxWidth: "60%",
                }}>
                <div
                    className={`d-inline-block rounded-3 shadow-sm px-3 py-2 ${
                        own
                            ? "float-start bg-secondary text-white"
                            : `float-end bg-white`
                    }`}>
                    <div className='d-flex flex-column text-break'>
                        <p
                            className='mb-1 fw-bold'
                            style={{
                                fontSize: "12px",
                            }}>
                            {message.first_name} {message.last_name}
                        </p>
                        <p>
                            {ReactEmoji.emojify(message.text)}
                            <span
                                className='ms-4 fw-light'
                                style={{
                                    fontSize: "12px",
                                }}>
                                {date} {time}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
