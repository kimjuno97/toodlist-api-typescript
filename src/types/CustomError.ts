export default class CustomError extends Error {
	statusCode?: 200 | 201 | 400 | 401 | 403 | 500;
}
