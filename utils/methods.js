export function respond(response, statusCode, success, message, data = {}) {
    response
        .status(statusCode)
        .json({ success: success, message: message, data: data });
}

export const createError = (statusCode, message, errors = []) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.cause = errors;
    return err;
  };