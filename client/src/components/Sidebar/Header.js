import React from "react";
import Logo from "./Logo";

function Header() {
    return (
        <header className='d-flex justify-content-center align-items-center py-4 w-100'>
            <Logo />
            <div className='d-flex gap-2'></div>
        </header>
    );
}

export default Header;
