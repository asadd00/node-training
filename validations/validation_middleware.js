import { respond } from "../utils/methods.js";

export const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(
            req['body'], 
            {
                abortEarly: false, // Return all errors, not just the first one
                stripUnknown: true, // Remove unknown properties
                errors: {
                    wrap: {
                    label: false // Don't wrap error labels
                    }
                }
            }
        )

        if(!error) {
            next();
            return;
        }

        const err = error.details.map((e) => e.message)

        respond(res, 500, false, err);
    }
}