export function respond(response, statusCode, status, message, data = {}) {
    response
        .status(statusCode)
        .json({ status: status, message: message, data: data });
}