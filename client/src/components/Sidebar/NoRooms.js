import React from "react";

function NoRooms() {
    return (
        <div className='h-100 border rounded d-flex flex-column justify-content-center py-4 align-items-center'>
            <i className='fw-bold text-warning fs-1 bi-emoji-frown'></i>
            <p className='fw-bold text-primary'>No Rooms?</p>
            <small className='text-dark'>
                Create or select a room and start chatting.
            </small>
        </div>
    );
}

export default NoRooms;
