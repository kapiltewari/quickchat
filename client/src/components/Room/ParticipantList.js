import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRoom } from "../../contexts/RoomContext";
import AddParticipantsModal from "./AddParticipantsModal";
import ParticipantCard from "./ParticipantCard";

function ParticipantList() {
    const { participants, room } = useRoom();
    const { user } = useAuth();

    useEffect(() => {}, [participants]);

    return (
        <div className='flex-grow-1 rounded'>
            {!participants ? null : (
                <div className='d-flex justify-content-between'>
                    <strong className='px-1'>Room Participants</strong>
                    {user.user_id === room.owner_id && <AddParticipantsModal />}
                </div>
            )}
            <div
                className='overflow-auto'
                style={{
                    maxHeight: "70vh",
                }}>
                {participants ? (
                    <>
                        {participants.map((participant) => (
                            <ParticipantCard
                                key={participant.participant_id}
                                participant={participant}
                            />
                        ))}
                    </>
                ) : (
                    <div className='d-flex flex-column align-items-center mt-4 border p-5 text-center rounded'>
                        <i className='bi-emoji-frown text-warning'></i>
                        <strong>No one is here. Try different room.</strong>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ParticipantList;
