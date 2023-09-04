import Container from '../Container';

export const Inject = (injections: string[]) => function injectionTarget<T extends { new(...args: any[]): {} }>(constructor: T): T | void {
    const ExtendedClass = class extends constructor {
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


    // https://stackoverflow.com/questions/61612407/properly-extend-constructor-with-decorators
    for(const propertyName of Object.getOwnPropertyNames(constructor)) {
        const descr = Object.getOwnPropertyDescriptor(constructor, propertyName)!;
        if(propertyName != 'prototype')
            Object.defineProperty(ExtendedClass, propertyName, descr);
    }
    return ExtendedClass;
};