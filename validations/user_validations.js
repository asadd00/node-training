import Joi from "joi";
import { lettersOnly } from '../validations/constants.js';


export const baseUserSchema = {
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(6).required()
};

export const createUserSchema = Joi.object ({
    ...baseUserSchema,
    name: Joi.string().regex(lettersOnly).min(3).max(50).required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password',
    }),
});

export const loginUserSchema = Joi.object ({
    ...baseUserSchema
});