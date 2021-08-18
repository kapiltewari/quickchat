import createError from "http-errors";
import {
    createParticipant,
    findParticipant,
} from "../database/queries/participant.js";
import {
    createRoom,
    findRoomByID,
    findRoomsByParticipantID,
} from "../database/queries/room.js";
import { successResponse } from "../utils/response.js";

export async function getRoom(req, res, next) {
    try {
        const roomID = req.params.room_id;
        if (!roomID) throw createError(400);

        const result = await findRoomByID(parseInt(roomID));
        if (!result) throw createError(404, "room not found");

        return successResponse(res, result);
    } catch (error) {
        next(error);
    }
}

export async function getRoomsByParticipantID(req, res, next) {
    try {
        const userID = res.get("user");

        const rooms = await findRoomsByParticipantID(parseInt(userID));
        if (!rooms) throw createError(500);

        return successResponse(res, rooms);
    } catch (error) {
        next(error);
    }
}

export async function addNewRoom(req, res, next) {
    try {
        const { name } = req.body;
        const userID = res.get("user");

        // first create the room
        const room = await createRoom(name, parseInt(userID));
        if (!room) throw 422;

        // add themselves to the room
        const created = await createParticipant(room.room_id, userID);
        if (!created) throw createError(500);

        return successResponse(res, room);
    } catch (error) {
        next(error);
    }
}

export async function joinRoom(req, res, next) {
    try {
        const { room_id, user_id } = req.body;

        const participant = await findParticipant(room_id, user_id);
        if (participant) throw createError(422, "you are already in the room");

        const joined = await createParticipant(room_id, user_id);
        if (!joined) throw createError(500);

        return successResponse(res, joined);
    } catch (error) {
        next(error);
    }
}
