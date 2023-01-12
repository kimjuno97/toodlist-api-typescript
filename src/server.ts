import { createApp } from './app';
import { Request, Response } from 'express';

const startServer = async () => {
	const app = createApp();

	app.get('/ping', (req: Request, res: Response) => {
		res.json({ message: 'pong' });
	});

	app.listen(3000, () => {
		console.log('Server listening on port: 3000');
	});
};

startServer();
