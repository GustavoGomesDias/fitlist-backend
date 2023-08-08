import { Exercism } from '@models/Exercism';
import UpdateUseCase from './UpdateUseCase';

export type CreateUser = Omit<Exercism, 'id'>;

export type UpdateUser = UpdateUseCase<Exercism, 'id'>;