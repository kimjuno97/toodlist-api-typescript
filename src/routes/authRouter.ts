import express from 'express';

import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/signin', authController.signIn);

export default authRouter;
