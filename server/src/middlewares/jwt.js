import { verifyAccessToken } from "../utils/jwt.js";

/**
 * loggedIn() middleware checks if user is logged in with given role or not,
 * if no role is given then all logged in users are allowed.
 * @param {string|string[]|null} roles Allowed Roles
 * @returns {void}
 */
export default function loggedIn(roles = null) {
    return async function (req, res, next) {
        // if not found then check in authorization headers
        if (!req.headers["authorization"]) {
            return res.status(401).json({
                error: "invalid header",
            });
        }

        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];

        // verify and get claims
        let claims = verifyAccessToken(token);
        if (!claims) {
            return res.status(401).json({
                error: "invalid token",
            });
        }

        if (roles !== null && roles.length > 0) {
            const ok = checkRole(claims.aud, roles);
            if (!ok) {
                return res.status(401).json({
                    error: "unauthorized",
                });
            }
        }

        // set claims
        res.set({
            user: claims.sub,
            role: claims.aud,
        });
        next();
    };
}

/**
 * @param {string} role user role to check in roles array
 * @param {string[]} roles given roles
 * @returns {true} returns true if role included in roles
 */
function checkRole(role, roles) {
    if (roles.includes(role)) {
        return true;
    }
}
