import { createError } from '../utils/methods.js';
import jwt from 'jsonwebtoken';
import userService from '../services/user_service.js';

export const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw createError(401, "Token not present");
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        throw createError(401, "Invalid token");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            next(createError(401, "Token has expired"));
        }
        else {
            try {
                const user = await userService.getUserById(payload.user_id);
                if (!user) {
                    throw createError(401, "User not found");
                }
                else {
                    const hasToken = await userService.getAccessTokenInfo(token);
                    if(!hasToken){
                        throw createError(401, "Token has expired");
                    }
                    else if (user.active === false) {
                        throw createError(401, "User is inactive, please contact the support center");
                    }
                    else if (user.deleted === true) {
                        throw createError(401, "User not found");
                    }
                    else {
                        user['access_token'] = hasToken.access_token;
                        req.user = user;

                        next();
                    }
                }
            } catch (error) {
                next(error);
            }
        }
    });

}