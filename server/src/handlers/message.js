import {
    createMessage,
    findMessagesByRoomID,
    findUserByMessageID,
} from "../database/queries/message.js";
import { findParticipant } from "../database/queries/participant.js";
import { successResponse } from "../utils/response.js";

export const messageSocket = (io, socket) => {
    async function sendMessage(data) {
        const isParticipant = await findParticipant(data.room_id, data.user_id);
        if (!isParticipant) {
            socket.emit(
                "sendMessageError",
                "Can't send the message. You are not a participant of this room."
            );
            return;
        }

        const message = await createMessage(
            data.room_id,
            data.user_id,
            data.text
        );

        const result = await findUserByMessageID(message.message_id);
        if (!result) throw createError(500);

        io.to(data.room_id.toString()).emit("receiveMessage", result);
    }

    socket.on("sendMessage", sendMessage);
};

export async function getMessagesByRoomID(req, res, next) {
    try {
        const roomID = req.params.room_id;
        if (!roomID) throw createError(400);

        const result = await findMessagesByRoomID(parseInt(roomID));
        if (!result) throw createError(404, "room not found");

        return successResponse(res, result);
    } catch (error) {
        next(error);
    }
}
