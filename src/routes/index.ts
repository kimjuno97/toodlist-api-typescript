import express from 'express';
import authRouter from './authRouter';
import todolistRouter from './todolistRouter';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/todo', todolistRouter);

export default router;
