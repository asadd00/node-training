import express from 'express';
import authController from '../controllers/AuthController.js';
import { validateRequest } from '../validations/validation_middleware.js';
import { createUserSchema, loginUserSchema } from '../validations/user_validations.js';
import { validateToken } from '../middlewares/auth_validation_middleware.js'

const router = express.Router();

router.get('/auth/test', (req, res) => {
    res.send(`route is working fine`);
  });

router.post("/auth/register", validateRequest(createUserSchema), authController.registerUser);

router.post("/auth/admin/register", validateRequest(createUserSchema), authController.registerUser);

router.post("/auth/login", validateRequest(loginUserSchema), authController.login);

router.get("/auth/user-profile", validateToken, authController.getUserProfile);

export default router;