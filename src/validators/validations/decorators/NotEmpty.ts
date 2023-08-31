import { BadRequestErr } from '@http-errors';
import { isInvalidField } from '../validations';

export const NotEmpty = (property: string) => function (target: object, propertyKey: string) {
	let value: string;
	const getter = function () {
		return value;
	};
	const setter = function (newVal: string) {
		if (isInvalidField(newVal)) {
			throw new BadRequestErr(`${property} é obrigatório.`);
		} else {
			value = newVal;
		}
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
};