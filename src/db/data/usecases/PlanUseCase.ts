import { Plan } from '@models/Plan';
import UpdateUseCase from './UpdateUseCase';

export type CreateUser = Omit<Plan, 'id'>;

export type UpdateUser = UpdateUseCase<Plan, 'id'>;