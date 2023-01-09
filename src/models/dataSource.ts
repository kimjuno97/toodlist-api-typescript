import { DataSource } from 'typeorm';

const database = new DataSource({
	type: 'mysql',
	host: process.env.TYPEORM_HOST,
	port: Number(process.env.TYPEORM_PORT),
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
});

database
	.initialize()
	.then(() => console.log('Data souce has been initialized!'))
	.catch(err => {
		console.error('Error during Data Source initialization', err);
		database.destroy();
	});

export default database;
