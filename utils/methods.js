export function respond(response, statusCode, status, message, data = {}) {
    response
        .status(statusCode)
        .json({ success: status, message: message, data: data });
}

export const createError = (statusCode, message, errors = []) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.cause = errors;
    return err;
  };