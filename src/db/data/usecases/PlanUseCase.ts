import { Plan } from '@models/Plan';
import UpdateUseCase from './UpdateUseCase';

export type CreatePlan = Omit<Plan, 'id'>;

export type UpdatePlan = UpdateUseCase<Plan, 'id'>;