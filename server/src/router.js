import { Router } from "express";
import { login, profile, signup } from "./handlers/auth.js";
import { getMessagesByRoomID } from "./handlers/message.js";
import {
    addRoomParticipant,
    getRoomParticipants,
} from "./handlers/participant.js";
import {
    addNewRoom,
    getRoom,
    getRoomsByParticipantID,
    joinRoom,
} from "./handlers/room.js";
import { getUserByID, getUsers } from "./handlers/user.js";
import loggedIn from "./middlewares/jwt.js";

const router = Router();

// session
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", loggedIn(), profile);

// rooms
router.get("/rooms", loggedIn(), getRoomsByParticipantID);
router.post("/rooms", loggedIn(), addNewRoom);
router.get("/rooms/:room_id/messages", loggedIn(), getMessagesByRoomID);
router.get("/rooms/:room_id", loggedIn(), getRoom);
router.post("/rooms/join", loggedIn(), joinRoom);

// users
router.get("/users/:user_id", loggedIn(), getUserByID);
router.get("/users", loggedIn(), getUsers);

// participants
router.get("/participants/:room_id", loggedIn(), getRoomParticipants);
router.post("/participants", loggedIn(), addRoomParticipant);

export default router;
