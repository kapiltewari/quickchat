import React from "react";
import { Button } from "react-bootstrap";

function IconButton({ color, bgColor, onClick, children, circle }) {
    return (
        <Button
            className={`${
                circle ? `rounded-circle` : `rounded`
            } ${bgColor} ${color} border-0 fs-5 fw-bold p-0 px-2`}
            onClick={onClick}>
            {children}
        </Button>
    );
}

export default IconButton;
