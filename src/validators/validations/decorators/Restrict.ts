import { BadRequestErr } from '@http-errors';

export const Restrict = (restrictList: Array<unknown>, property: string) => function (target: object, propertyKey: string) {
	let value: string;
	const getter = function () {
		return value;
	};
	const setter = function (newVal: string) {
		if (!(newVal in restrictList)) {
			throw new BadRequestErr(`Valor inválido para ${property}.`);
		} else {
			value = newVal;
		}
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
};