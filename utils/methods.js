export function respond(response, statusCode, status, message, errors, data = {}) {
    response
        .status(statusCode)
        .json({ status: status, message: message, errors, data: data });
}