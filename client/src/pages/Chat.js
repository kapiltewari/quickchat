import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Chatbox from "../components/Chatbox/Chatbox";
import Sidebar from "../components/Sidebar/Sidebar";
import { socket } from "../contexts/SocketContext";
import { useRoom } from "../contexts/RoomContext";
import Room from "../components/Room/Room";
import Welcome from "../components/Chatbox/Welcome";
import { useAuth } from "../contexts/AuthContext";

function Chat() {
    const { room } = useRoom();
    const { onlineUsers, setOnlineUsers } = useAuth();

    useEffect(() => {
        socket.open();
        socket.on("connect", () => {
            console.log("connected with backend");
        });

        return () => socket.close();
    }, []);

    useEffect(() => {
        socket.on("onlineUsers", (data) => {
            setOnlineUsers(data);
        });
    }, [onlineUsers]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container
            className='flex-grow-1 d-flex flex-column p-0 vh-100 bg-white'
            fluid>
            <Row className='gx-0'>
                <Col md={3}>
                    <Sidebar />
                </Col>
                <Col md={9}>
                    {!room ? (
                        <Welcome />
                    ) : (
                        <Row className='gx-0'>
                            <Col md={8}>
                                <Chatbox />
                            </Col>
                            <Col md={4}>
                                <Room />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Chat;
