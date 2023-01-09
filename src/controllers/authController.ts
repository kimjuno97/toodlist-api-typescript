import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import CustomError from '../types/CustomError';

const signUp = async (req: Request, res: Response, nest: NextFunction) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'KEY_ERROR' });
		}

		const TOKEN = await authService.signUp({ name, email, password });

		return res.status(201).json({
			message: 'SIGNUP_SUCESS',
			TOKEN,
		});
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const TOKEN = await authService.signIn({ email, password });

		return res.status(201).json({
			message: 'SIGNIN_SUCESS',
			TOKEN,
		});
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const authController = {
	signUp,
	signIn,
};

export default authController;
