import database from './dataSource';
import { signUpProps, signInProps } from '../types/signUpProps';
import CustomError from '../types/CustomError';

const signUp = async ({ name, email, password }: signUpProps) => {
	try {
		await database.query(
			`
            INSERT INTO users(
                name,
                email,
                password
            ) VALUES (?, ?, ?);`,
			[name, email, password]
		);

		return await database.query(
			`SELECT id, email FROM users
                WHERE users.email='${email}'`
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const signIn = async ({ email, password }: signInProps) => {
	try {
		return await database.query(
			`SELECT id, email FROM users
			WHERE 
				users.email='${email}' 
			AND users.password='${password}'`
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const authDao = {
	signUp,
	signIn,
};

export default authDao;
