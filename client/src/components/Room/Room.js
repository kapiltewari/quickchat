import React from "react";
import Topbar from "./Topbar";
import ParticipantList from "./ParticipantList";

function Participants() {
    return (
        <div className='d-flex flex-column justify-content-center h-100'>
            <div
                className='d-flex flex-column pe-4 gap-3'
                style={{
                    minHeight: "90vh",
                }}>
                <Topbar />
                <ParticipantList />
            </div>
        </div>
    );
}

export default Participants;
