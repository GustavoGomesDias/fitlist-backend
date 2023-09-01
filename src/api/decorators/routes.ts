import RouterControl from "@router-control";

/**
 * @description Assign router with post method
 */
export const Post = (path: string) => (target: any, key: string, descriptor: PropertyDescriptor): void => {
	RouterControl.registerRouters(`${target.constructor.name}`, {
		method: 'post',
		path,
		controllerMethod: key,
	});
};

/**
 * @description Assign router with get method
 */
export const Get = (path: string) => (target: any, key: string, descriptor: PropertyDescriptor): void => {
	RouterControl.registerRouters(`${target.constructor.name}`, {
		method: 'get',
		path,
		controllerMethod: key,
	});
};

/**
 * @description Assign router with put method
 */
export const Put = (path: string) => (target: any, key: string, descriptor: PropertyDescriptor): void => {
	RouterControl.registerRouters(`${target.constructor.name}`, {
		method: 'put',
		path,
		controllerMethod: key,
	});
};


/**
 * @description Assign router with delete method
 */
export const Delete = (path: string) => (target: any, key: string, descriptor: PropertyDescriptor): void => {
	RouterControl.registerRouters(`${target.prototype.name}`, {
		method: 'delete',
		path,
		controllerMethod: key,
	});
};


/**
 * @description Assign router prefix
 */
export const Route = (prefix: string): ClassDecorator => (target) => {
	RouterControl.registerPrefix(target.name, prefix);
};