// 타입스크립트를 쓰면 express 선언전에 dotenv.config 해줘야함
import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: 'pong' });
});

app.listen(3000, () => {
	console.log('Server listening on port: 3000');
});
