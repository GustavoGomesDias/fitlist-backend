import { IApiRouterDefinition } from './IRouterDifinition';

export default class RouterControl {
    private static prefix = new Map<string, unknown>();
    private static router = new Map<string, IApiRouterDefinition[]>();

    static registerPrefix(key: string, prefix: unknown) {
        RouterControl.prefix.set(key, prefix);
    }

    static hasPrefix(key: string) {
        return RouterControl.prefix.has(key);
    }

    static getPrefix(key: string) {
        return RouterControl.prefix.get(key);
    }

    static registerRouters(key: string, router: IApiRouterDefinition) {
        if (!RouterControl.router.has(key as string)) {
            RouterControl.router.set(key, [router]);

            return;
        }

        const controllerRouter = RouterControl.router.get(key) as IApiRouterDefinition[];

        controllerRouter.push(router);

        RouterControl.router.set(key as string, controllerRouter as IApiRouterDefinition[]);
    }

    static hasRouters(key: string) {
        return RouterControl.router.has(key);
    }

    static getRouters(key: string) {
        return RouterControl.router.get(key);
    }
}