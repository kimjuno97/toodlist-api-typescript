import database from './dataSource';
import signUpProps from '../types/signUpProps';
import CustomError from '../types/errorProps';

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
		console.log('여기까지옴?>=========');
		return await database.query(
			`SELECT id, email FROM users
                WHERE users.email='${email}'`
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 500;
	}
};

const authDao = {
	signUp,
};

export default authDao;
