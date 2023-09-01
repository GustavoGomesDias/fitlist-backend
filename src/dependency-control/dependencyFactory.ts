import BcryptServices from '@services/BcryptService';
import Container from './Container';
import { TrainingPlanDAOImp, UserDAOImp } from '@DAO';
import JwtService from '@services/JWTService';

export const dependencyFactory = (): void => {
    // Services
    Container.register('Encrypt', new BcryptServices());
    Container.register('Token', new JwtService());
  
    // Persistence
    Container.register('UserDAOImp', new UserDAOImp());
    Container.register('TrainingPlanDAOImp', new TrainingPlanDAOImp());
  };