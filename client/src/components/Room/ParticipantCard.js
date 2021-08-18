import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import StatusBadge from "./StatusBadge";
import { getUser } from "../../api/user";

function ParticipantCard({ participant }) {
    const { token, onlineUsers } = useAuth();
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("offline");

    useEffect(() => {
        async function getParticipantsDetails() {
            await getUser(participant.user_id, token)
                .then((res) => {
                    setUser(res.data.data);
                })
                .catch((error) => console.log(error));
        }

        getParticipantsDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let found;

        for (let i in onlineUsers) {
            if (user?.user_id === onlineUsers[i]) {
                found = true;
            }
        }

        if (found) {
            setStatus("online");
        } else {
            setStatus("offline");
        }
    }, [user, onlineUsers, status]);

    return (
        <>
            {user && (
                <div
                    className='d-flex bg-transparent align-items-center rounded justify-content-between px-2'
                    style={{ height: "40px", cursor: "default" }}>
                    <p>
                        {user.first_name} {user.last_name}
                    </p>
                    <StatusBadge status={status} />
                </div>
            )}
        </>
    );
}

export default ParticipantCard;
