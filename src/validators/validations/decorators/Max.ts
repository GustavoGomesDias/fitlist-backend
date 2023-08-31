import { BadRequestErr } from '@http-errors';

export const Max = (limit: number, property: string) => function (target: object, propertyKey: string) {
	let value: string;
	const getter = function () {
		return value;
	};
	const setter = function (newVal: string) {
		if (newVal.length > limit) {
			throw new BadRequestErr(`O tamanho de ${property} precisa ser menor que ${limit}.`);
		} else {
			value = newVal;
		}
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
};