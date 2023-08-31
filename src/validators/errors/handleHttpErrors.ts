import { BadRequestErr } from './BadRequestErr';
import { ForbiddenErr } from './ForbiddenErr';
import { NotFoundErr } from './NotFoundErr';
import { UnauthorizedErr } from './UnauthorizedErr';


export interface HandleErrorReturn {
  error: string
  statusCode: number
}

export const handleHttpErrors = (err: Error): HandleErrorReturn => {
	const errorInfo = {
		BadRequestErr,
		UnauthorizedErr,
		ForbiddenErr,
		NotFoundErr,
	};

	const defaultError = {
		error: 'Erro de servidor, tente novamente mais tarde.',
		statusCode: 500,
	};

	for (const [errorType, errorConstructor] of Object.entries(errorInfo)) {
		if (err instanceof errorConstructor) {
			return {
				error: err.message,
				statusCode: err.statusCode,
			};
		}
	}

	return defaultError;
};