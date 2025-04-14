import express from 'express';
import authController from '../controllers/AuthController.js';
import { validateRequest } from '../validations/validation_middleware.js';
import { createUserSchema } from '../validations/user_validations.js';

const router = express.Router();

router.get('/auth/test', (req, res) => {
    res.send(`route is working fine`);
  });

router.post("/auth/register", validateRequest(createUserSchema), authController.registerUser);

router.post("/auth/login", authController.login);

router.get("/auth/user-profile", authController.validateToken, authController.getUserProfile);

export default router;