import { jest } from '@jest/globals';

jest.useFakeTimers();

import requsest from 'supertest';

import createApp from '../src/app';
import database from '../src/models/dataSource';

describe('sign Up', () => {
	let app;

	beforeAll(async () => {
		app = createApp();
		await database.initialize();
	});

	afterAll(async () => {
		await database.query(`TRUNCATE users`);
		await database.destroy();
	});

	test('SUCCESS: signup', async () => {
		await requsest(app)
			.post('/auth/signup')
			.send({
				name: '아무개',
				email: 'zzz1234@naver.com',
				password: 'password12!Q',
			})
			.expect(201)
			.expect({ message: 'SUCCESS SIGN UP' });
	});
});
