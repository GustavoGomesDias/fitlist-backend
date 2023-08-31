import Container from '../Container';

export const Inject = (injections: string[]) => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
    return class extends constructor {
      constructor(...args: any[]) {
        const injectedArgs: any[] = injections.map((key) => {
          if (!Container.hashProperty(key)) {
            throw new Error(`Not possible injecting: ${key}`);
          }
  
          return Container.get(key);
        });
        super(...injectedArgs);
      }
    };
  };