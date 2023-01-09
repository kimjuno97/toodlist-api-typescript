import express from 'express';

import authController from '../controllers/authController';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

const authRouter = {
	router,
};

export default authRouter;
