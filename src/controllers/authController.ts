import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import errorProps from '../types/errorProps';

const signUp = async (req: Request, res: Response, nesx: NextFunction) => {
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
		if (err instanceof errorProps) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const authController = {
	signUp,
};

export default authController;
