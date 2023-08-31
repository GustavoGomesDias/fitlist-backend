import { TrainingPlan } from '@models/TrainingPlan';
import UpdateUseCase from './UpdateUseCase';

export type CreateTrainingPlan = Omit<TrainingPlan, 'id'>;

export type UpdateTrainingPlan = UpdateUseCase<TrainingPlan, 'id' | 'userId'>;