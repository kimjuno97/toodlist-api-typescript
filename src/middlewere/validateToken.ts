import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const validateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization;
		if (process.env.JWT_SECRET && token) {
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			if (decode.sub) {
				req.body = { userId: decode.sub };
			}
		}
		next();
	} catch (err) {
		res.status(401).json({ message: 'INVALID_TOKEN' });
	}
};

export default validateToken;
