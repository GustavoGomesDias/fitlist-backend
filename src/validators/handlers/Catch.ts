import { IResponse } from '@http';
import { handleHttpErrors } from '../errors/handleHttpErrors';

const Catch = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
  
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (err) {
        const { error, statusCode } = handleHttpErrors(err as Error);
  
        console.log(err);
  
        return {
          statusCode,
          body: {
            error,
          },
        } as IResponse;
      }
    };
  
    return descriptor;
  };
  
  export default Catch;