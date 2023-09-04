import { TrainingPlan } from '@models/TrainingPlan';
import UpdateUseCase from './UpdateUseCase';
import { WeekDayPlan } from '@models/WeekDayPlan';

export type CreateTrainingPlan = Omit<TrainingPlan, 'id'>;

export type UpdateTrainingPlan = UpdateUseCase<TrainingPlan, 'id' | 'userId'>;

export type CheckWekDayPlanAndUser = {
    weekDayPlan: Array<WeekDayPlan>,
    user: {
        id: string
    }
}