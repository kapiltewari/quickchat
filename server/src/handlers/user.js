import { findUserByID, findUsers } from "../database/queries/user.js";
import { successResponse } from "../utils/response.js";

export async function getUserByID(req, res, next) {
    try {
        const userID = req.params.user_id;
        if (!userID) throw createError(400);

        const result = await findUserByID(parseInt(userID));
        if (!result) throw createError(404, "room not found");

        return successResponse(res, result);
    } catch (error) {
        next(error);
    }
}

export async function getUsers(req, res, next) {
    try {
        const result = await findUsers();
        if (!result) throw createError(500);

        return successResponse(res, result);
    } catch (error) {
        next(error);
    }
}
