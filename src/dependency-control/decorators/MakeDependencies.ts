import { dependencyFactory } from '../dependencyFactory';

export const MakeDependencies = () => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
    dependencyFactory();
  };