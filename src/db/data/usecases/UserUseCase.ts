import { User } from '@models/User';
import UpdateUseCase from './UpdateUseCase';

export type CreateUser = Omit<User, 'id'>;

export type UpdateUser = UpdateUseCase<User, 'id'>;

export type UserDecodePayload = Omit<User, 'password'>;

export type UserLogin = Omit<User, 'id' | 'name'>