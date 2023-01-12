// 타입스크립트를 쓰면 express 선언전에 dotenv.config 해줘야함
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

export const createApp = () => {
	const app = express();

	app.use(cors());
	app.use(morgan('combined'));
	app.use(express.json());
	app.use(routes);

	return app;
};
