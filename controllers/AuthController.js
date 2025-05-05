import { respond, createError } from '../utils/methods.js'
import userService from '../services/user_service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {user_role_admin, user_role_user} from '../utils/constants.js'

class AuthController {
    registerUser = async (req, res, next) => {
        try {
            const params = req.body
            const {name, username, password, confirm_password} = params;

            const userWithThisUsername = await userService.getUserByUsername(username);
            if(userWithThisUsername){
                throw createError(400, "User with this username is already exists");
            }

            delete params['confirm_password'];
            params['password'] = await bcrypt.hash(password, 10);
            params['role'] = req.route.path.includes('admin') ? user_role_admin : user_role_user;
            const user = await userService.registerUser(params);

            if(user){
                const user_id = user._id.toString();
                delete user._id;
                delete user.password;
                let access_token = this.generateAccessToken({user_id: user_id});
                await userService.updateAccessToken(user_id, access_token);
                user['access_token'] = access_token;
                respond(res, 200, true, "Success", user);
            }
            else {
                throw createError(500, "Something went wrong, please try again");
            }

        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            const {username, password} = req.body;

            const user = await userService.login(username);
            if(user){
                const passwordCorrect = await bcrypt.compare(password, user.password)
                if(passwordCorrect){
                    const user_id = user._id.toString();
                    delete user._id;
                    delete user.password;
                    let access_token = this.generateAccessToken({user_id: user_id});
                    await userService.updateAccessToken(user_id, access_token);
                    user['access_token'] = access_token;
                    respond(res, 200, true, "Success", user);
                }
                else {
                    throw createError(400, "User not found");
                }
            }
            else {
                throw createError(400, "User not found");
            }

        } catch (error) {
            next(error);
        }
    }

    getUserProfile = async (req, res, next) => {
        const user = req.user;
        try {
            if(user){
                delete user._id;
                respond(res, 200, true, "Success", user);
            }
            else {
                throw createError(400, "User not found");
            }
        } catch (error) {
            next(error);
        }
    }

    ////////////////////////////////////////////////

    generateAccessToken = (user) => {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        return accessToken;
    }

    generateRefreshToken = (user) => {
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
        return refreshToken;
    }
}

export default new AuthController();