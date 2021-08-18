import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { socket } from "../../contexts/SocketContext";
import { useHistory } from "react-router-dom";
import IconButton from "../Ui/IconButton";
import { toast } from "react-toastify";

function Welcome() {
    const router = useHistory();
    const { user, setIsOnline } = useAuth();

    function logout() {
        setIsOnline(false);
        localStorage.clear();
        socket.emit("logout");
        socket.close();
        router.push("/login");
        toast.success("Logged out successfully.");
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='d-flex flex-column align-items-center'>
                <motion.h1
                    className='text-dark'
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        ease: "easeOut",
                        duration: 1.5,
                    }}>
                    Welcome!{" "}
                    <span className='text-secondary'>
                        {user.first_name} {user.last_name}.
                    </span>
                </motion.h1>
                <motion.small
                    className='fs-6 text-muted'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: "easeOut",
                        duration: 2,
                        delay: 1.5,
                    }}>
                    Please create or select a room to get started.
                </motion.small>
                <motion.div
                    className='d-flex text-muted'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        ease: "easeOut",
                        duration: 2,
                        delay: 3.5,
                    }}>
                    <div onClick={logout} style={{ cursor: "pointer" }}>
                        Or you can logout here.
                        <IconButton color='text-danger' bgColor='bg-white'>
                            <i className='bi-box-arrow-right' />
                        </IconButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Welcome;
