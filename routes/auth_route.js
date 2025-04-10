import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

router.get('/auth/test', (req, res) => {
    res.send(`route is working fine`);
  });

router.post("/auth/register", authController.registerUser);

router.post("/auth/login", authController.login);

router.get("/auth/user-profile", authController.validateToken, authController.getUserProfile);

export default router;