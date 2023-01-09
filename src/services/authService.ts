import jwt from 'jsonwebtoken';

import authDao from '../models/authDao';

import CustomError from '../types/CustomError';
import { signUpProps, signInProps } from '../types/signUpProps';

interface TypeUserInfo {
	id: number;
	email: string;
}

const signUp = async ({ name, email, password }: signUpProps) => {
	const pwValidation = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

	if (!pwValidation.test(password)) {
		const err = new CustomError('PASSWORD_IS_NOT_VALID');
		err.statusCode = 400;
		throw err;
	}

	const [userInfo]: TypeUserInfo[] = await authDao.signUp({
		name,
		email,
		password,
	});
	if (process.env.JWT_SECRET) {
		return jwt.sign(
			{ sub: userInfo.id, email: userInfo.email },
			process.env.JWT_SECRET
		);
	}
};

const signIn = async ({ email, password }: signInProps) => {
	const [userInfo]: TypeUserInfo[] = await authDao.signIn({ email, password });

	if (!userInfo) {
		const err = new CustomError('NO_USER_INFO');
		err.statusCode = 400;
	}
	if (process.env.JWT_SECRET) {
		return jwt.sign(
			{ sub: userInfo.id, email: userInfo.email },
			process.env.JWT_SECRET
		);
	}
};

const authService = {
	signUp,
	signIn,
};

export default authService;
