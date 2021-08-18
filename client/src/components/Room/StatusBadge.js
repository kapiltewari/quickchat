import React from "react";

function StatusBadge({ status }) {
    return (
        <div
            className='d-flex align-items-center p-1 rounded'
            style={{
                backgroundColor: `${
                    status === "online"
                        ? "rgba(66, 245, 114, 0.4)"
                        : "rgba(245, 78, 66, 0.4)"
                }`,
                height: "12px",
            }}>
            <small style={{ fontSize: "10px" }}>{status}</small>
        </div>
    );
}

export default StatusBadge;
