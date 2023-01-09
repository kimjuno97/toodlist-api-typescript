import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(routes);

app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: 'pong' });
});

app.listen(3000, () => {
	console.log('Server listening on port: 3000');
});
