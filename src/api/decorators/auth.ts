import { IRequest } from '@http';
import Auth from '../middlewares/auth/Auth';

export const AuthRequired = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
  
    descriptor.value = async function (...args: any[]) {
      const authMiddleware = new Auth();
      await authMiddleware.authentitcated(args[0] as IRequest);
      return await originalMethod.apply(this, args);
    };
  
    return descriptor;
  };