import BcryptServices from '@services/BcryptService';
import Container from './Container';
import { UserDAOImp } from '@DAO';

export const dependencyFactory = (): void => {
    // Services
    Container.register('Encrypt', new BcryptServices());
  
    // Persistence
    Container.register('UserDAOImp', new UserDAOImp());
  };