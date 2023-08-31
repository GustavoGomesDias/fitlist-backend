import { BadRequestErr } from '@http-errors';
import { isInvalidField } from '../validations';

export const Min = (limit: number, property: string) => function (target: object, propertyKey: string) {
	let value: string;
	const getter = function () {
		return value;
	};
	const setter = function (newVal: string) {
		
		if (isInvalidField(newVal) || newVal.length < limit) {
			throw new BadRequestErr(`O tamanho de ${property} precisa ser maior que ${limit}.`);
		} else {
			value = newVal;
		}
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
};