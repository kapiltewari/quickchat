import bcrypt from "bcrypt";

/**
 * hashPasswod() hashes the plain password
 * @param {string} plainPassword plain password
 * @returns {string} returns hashed password
 */
export async function hashPassword(plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return hashedPassword;
}

/**
 * matchPassword() matches plain password with hashed password
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {boolean}
 */
export async function matchPassword(plainPassword, hashedPassword) {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
}
