import createHttpError from "http-errors";
import {
    createUser,
    findUserByEmail,
    findUserByID,
} from "../database/queries/user.js";
import { generateTokens } from "../utils/jwt.js";
import { hashPassword, matchPassword } from "../utils/password.js";
import { successResponse } from "../utils/response.js";

export async function signup(req, res, next) {
    try {
        if (!req.body) throw createHttpError(400);

        // get user information
        const { first_name, last_name, email, password } = req.body;

        // find existing user in the database
        const existingUser = await findUserByEmail(email);
        if (existingUser)
            throw createHttpError(409, "email is already registered");

        //hash password
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) throw createHttpError(500);

        // create new user
        const newUser = await createUser(
            first_name,
            last_name,
            email,
            hashedPassword
        );
        if (!newUser) throw createHttpError(500);

        return successResponse(res, newUser);
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        if (!req.body) throw createHttpError(400);
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) throw createHttpError(404, "invalid details");

        const ok = await matchPassword(password, user.password);
        if (!ok) throw createHttpError(404, "invalid details");

        const tokens = await generateTokens(user.user_id.toString(), user.role);

        return successResponse(res, tokens);
    } catch (error) {
        next(error);
    }
}

export async function profile(req, res, next) {
    try {
        const userID = res.get("user");

        const user = await findUserByID(parseInt(userID));
        if (!user) throw createError(404, "user not found");

        return successResponse(res, user);
    } catch (error) {
        next(error);
    }
}
