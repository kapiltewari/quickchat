/**
 * successResponse() sends a success response
 * @param {Object} res expressjs response object
 * @param {any} data data to send back with response
 * @param {number | null} statusCode http status code
 * @returns {Object} json response
 */
export function successResponse(res, data, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        code: statusCode,
        data: data,
    });
}
