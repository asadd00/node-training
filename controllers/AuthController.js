import { respond } from '../utils/methods.js'
import jwt from 'jsonwebtoken'
import userService from '../services/user_service.js';
import bcrypt from 'bcrypt';

class AuthController {
    registerUser = async (req, res) => {
        try {
            const params = req.body
            const {name, username, password, confirm_password} = params;

            if(!name) {
                respond(res, 400, false, "Name is empty");
                return;
            }
            if(!username) {
                respond(res, 400, false, "Username is empty");
                return;
            }
            if(!password) {
                respond(res, 400, false, "Password is empty");
                return;
            }
            if(!confirm_password) {
                respond(res, 400, false, "Confirm Password is empty");
                return;
            }
            if(password.length < 6) {
                respond(res, 400, false, "Password must contain atleast 6 characters");
                return;
            }
            if(password != confirm_password){
                respond(res, 400, false, "Passwords does not match");
                return;
            }

            const userWithThisUsername = await userService.getUserByUsername(username);
            if(userWithThisUsername){
                respond(res, 400, false, "User with this username is already exists");
                return;
            }

            delete params['confirm_password'];
            params['password'] = await bcrypt.hash(password, 10);
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
                respond(res, 500, false, "Something went wrong, please try again");
            }

        } catch (error) {
            respond(res, 500, false, error.message);
        }
    }

    login = async (req, res) => {
        try {
            const {username, password} = req.body;

            if(!username || !password){
                respond(res, 400, false, "Incorrect username or password");
                return;
            }

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
                    respond(res, 400, false, "User not found");
                }
            }
            else {
                respond(res, 400, false, "User not found");
            }

        } catch (error) {
            respond(res, 500, false, error.message);
        }
    }

    getUserProfile = async (req, res) => {
        const user = req.user;
        if(user){
            delete user._id;
            respond(res, 200, true, "Success", user);
        }
        else {
            respond(res, 400, false, "User not found");
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

    //middleware
    validateToken = (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            respond(res, 401, false, "Token not present");
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            respond(res, 401, false, "Invalid token");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            if (err) {
                respond(res, 401, false, "Invalid token");
            }
            else {
                try {
                    const user = await userService.getUserById(payload.user_id);
                    if (!user) {
                        respond(res, 401, false, "User not found");
                    }
                    else {
                        const hasToken = await userService.getAccessTokenInfo(token);
                        if(!hasToken){
                            respond(res, 401, false, "Token has expired");
                        }
                        else if (user.active === false) {
                            respond(res, 401, false, "User is inactive, please contact the support center");
                        }
                        else if (user.deleted === true) {
                            respond(res, 401, false, "User not found");
                        }
                        else {
                            user['access_token'] = hasToken.access_token;
                            req.user = user;
    
                            next();
                        }
                    }
                } catch (error) {
                    console.log(error);
                    respond(res, 500, false, error.message);
                }
            }
        });

    }
}

export default new AuthController();