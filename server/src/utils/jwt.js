import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

/**
 * generateTokens() generates the access token and refresh token for a particular user
 * @param {string} userID user's id
 * @param {string} role user's role
 * @returns {Object} returns the tokens object
 */
export async function generateTokens(userID, role) {
    const accessToken = jwt.sign({}, process.env.JWT_SECRET, {
        algorithm: "HS256",
        subject: userID,
        audience: role,
        expiresIn: "1h", // 1 hour
    });

    // unique jti for refresh token
    let jti = uuidv4();

    const refreshToken = jwt.sign(
        {
            jti: jti,
        },
        process.env.JWT_SECRET,
        {
            algorithm: "HS256",
            subject: userID,
            audience: role,
            expiresIn: "10d", // 10 days
        }
    );

    const tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
    };

    return tokens;
}

/**
 * verifies a given access token
 * @param {string} accessToken
 * @returns {Object} returns decoded claims
 */
export function verifyAccessToken(accessToken) {
    let claims = {};
    jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
        {
            algorithms: ["HS256"],
        },
        (_, payload) => {
            claims = payload;
        }
    );

    return claims;
}

/**
 * verifies a given refresh token
 * @param {string} refreshToken
 * @returns {Object} returns decoded claims
 */
export function verifyRefreshToken(refreshToken) {
    let claims = {};

    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        {
            algorithms: ["HS256"],
        },
        (_, payload) => {
            claims = payload;
        }
    );

    return claims;
}
