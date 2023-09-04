import { BadRequestErr } from '@http-errors';
import { notUndefined } from '../validations';

export const NotUndefined = (property: string) => function (target: object, propertyKey: string) {
	let value: string;
	const getter = function () {
		return value;
	};
	const setter = function (newVal: string) {
		if (notUndefined(newVal)) {
            value = newVal;
		} else {
			throw new BadRequestErr(`${property} é obrigatório.`);
		}
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
};