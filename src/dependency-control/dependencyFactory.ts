import Container from './Container';
import { UserDAOImp } from '@DAO';

export const dependencyFactory = (): void => {
    // Services
    // ...
  
    // Persistence
    Container.register('UserDAOImp', new UserDAOImp());
  };