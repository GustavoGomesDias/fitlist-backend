export class ForbiddenErr extends Error {
	public readonly statusCode: number = 403;

	constructor(message: string) {
		super(message);
		this.name = 'ForbiddenErr';
	}
}