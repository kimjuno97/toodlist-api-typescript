import jwt from 'jsonwebtoken';

import authDao from '../models/authDao';

import CustomError from '../types/errorProps';
import signUpProps from '../types/signUpProps';

const signUp = async ({ name, email, password }: signUpProps) => {
	const pwValidation = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

	if (!pwValidation.test(password)) {
		const err = new CustomError('PASSWORD_IS_NOT_VALID');
		err.statusCode = 400;
		throw err;
	}

	const [userInfo]: { id: number; email: string }[] = await authDao.signUp({
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

const authService = {
	signUp,
};

export default authService;
