import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import IconButton from "../Ui/IconButton";
import { socket } from "../../contexts/SocketContext";
import { toast } from "react-toastify";

function Topbar() {
    const router = useHistory();
    const { user, isOnline, setIsOnline } = useAuth();

    function logout() {
        setIsOnline(false);
        localStorage.clear();
        socket.emit("logout");
        socket.close();
        router.push("/login");
        toast.success("Logged out successfully.");
    }

    function toggleOnline() {
        socket.emit("toggleOnline", { user_id: user.user_id });
        setIsOnline(true);
    }

    function toggleOffline() {
        socket.emit("toggleOffline");
        setIsOnline(false);
    }

    useEffect(() => {
        socket.on("disconnect", () => {
            console.log("disconnected from backend");
        });
    }, []);

    useEffect(() => {}, [isOnline]);

    return (
        <div
            className='d-flex align-items-center justify-content-between bg-white border rounded px-2'
            style={{ minHeight: "40px" }}>
            <div className='d-flex gap-2 align-items-center'>
                <h5 className='mb-0 fw-bold fs-6'>
                    {user.first_name} {user.last_name}
                </h5>
                {isOnline ? (
                    <i
                        className='bi-circle-fill text-success'
                        style={{
                            fontSize: "8px",
                        }}
                    />
                ) : (
                    <i
                        className='bi-circle-fill text-danger'
                        style={{
                            fontSize: "8px",
                        }}
                    />
                )}
            </div>
            <div className='d-flex gap-2'>
                {isOnline ? (
                    <button
                        className='p-0 bg-transparent border-0 fs-4'
                        onClick={toggleOffline}>
                        <i className='bi-toggle-on text-success'></i>
                    </button>
                ) : (
                    <button
                        className='p-0 bg-transparent border-0 fs-4'
                        onClick={toggleOnline}>
                        <i className='bi-toggle-off text-danger'></i>
                    </button>
                )}
                <IconButton
                    color='text-danger'
                    bgColor='bg-white'
                    onClick={logout}>
                    <i className='bi-box-arrow-right' />
                </IconButton>
            </div>
        </div>
    );
}

export default Topbar;
