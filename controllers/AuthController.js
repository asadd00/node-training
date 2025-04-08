import { respond } from '../utils/methods.js'
import jwt from 'jsonwebtoken'

class AuthController {
    registerUser = async (req, res) => {
        try {
            const {username, password} = req.body;

            if(!username || !password){
                respond(res, 400, false, "Incorrect username or password");
                return;
            }

            let access_token = this.generateAccessToken({user_id: 1});
            respond(res, 200, true, "Success", {access_token: access_token});

        } catch (error) {
            respond(res, 400, false, error);
        }
    }

    login = async (req, res) => {
        try {
            const {username, password} = req.body;

            if(!username || !password){
                respond(res, 400, false, "Incorrect username or password");
                return;
            }

            let access_token = this.generateAccessToken({user_id: 1});
            respond(res, 200, true, "Success", {access_token: access_token});

        } catch (error) {
            respond(res, 400, false, error);
        }
    }

    validateApiToken = async (req, res) => {
        respond(res, 200, true, "Success");
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
                    // const user = await userService.getById(payload.user_id);
                    const user = {};
                    if (!user) {
                        respond(res, 401, false, "User not found");
                    }
                    else if (user.active === false) {
                        respond(res, 401, false, this.msgUserInActive);
                    }
                    else if (user.deleted === true) {
                        respond(res, 401, false, "User not found");
                    }
                    else {
                        req.user = user;

                        next();
                    }
                } catch (error) {
                    console.log(error);
                    respond(res, 401, false, error.code);
                }
            }
        });

    }
}

export default new AuthController();