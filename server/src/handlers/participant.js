import {
    createParticipant,
    findParticipantsByRoomID,
    findParticipant,
} from "../database/queries/participant.js";
import { findUserByEmail } from "../database/queries/user.js";
import { successResponse } from "../utils/response.js";
import createError from "http-errors";

export const participantSocket = (io, socket) => {
    async function addParticipant({ user_id, room_id }) {
        const participant = await findParticipant(room_id, user_id);
        if (participant) {
            socket.emit("addParticipantToTheRoomAlreadyAddedError");
            return;
        }

        const created = await createParticipant(room_id, user_id);
        if (!created) {
            socket.emit("addParticipantToTheRoomError");
            return;
        }

        socket.emit("addParticipantToTheRoomSuccess", created);
    }

    socket.on("addParticipantToTheRoom", addParticipant);
};

export async function getRoomParticipants(req, res, next) {
    try {
        const roomID = req.params.room_id;

        const participants = await findParticipantsByRoomID(parseInt(roomID));
        if (!participants) throw createError(500);

        return successResponse(res, participants);
    } catch (error) {
        next(error);
    }
}

export async function addRoomParticipant(req, res, next) {
    try {
        const { email, room_id } = req.body;
        const user = await findUserByEmail(email);
        if (!user) throw createError(404, "user not found");

        const participant = await findParticipant(room_id, user.user_id);
        if (participant)
            throw createError(422, "user already added in the room");

        const created = await createParticipant(room_id, user.user_id);
        if (!created) throw createError(500);

        return successResponse(res, created);
    } catch (error) {
        next(error);
    }
}
