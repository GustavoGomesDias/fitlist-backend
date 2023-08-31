import { BadRequestErr } from "@http-errors"; 

export const IsEmail = () => function (target: object, propertyKey: string) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let value: string;
	const getter = function () {
		return value;
	};
	const setter = function (newVal: string) {
		if (!regex.test(newVal)) {
			throw new BadRequestErr('E-mail inválido.');
		} else {
			value = newVal;
		}
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
};