import { User } from '@models/User';
import UpdateUseCase from './UpdateUseCase';

export type CreateUser = Omit<User, 'id'>;

export type UpdateUser = UpdateUseCase<User, 'id'>;