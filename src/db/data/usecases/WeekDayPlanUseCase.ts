import { WeekDayPlan } from '@models/WeekDayPlan';
import UpdateUseCase from './UpdateUseCase';

export type CreateWeekDayPlan = Omit<WeekDayPlan, 'id'>;

export type CreateWeekDayPlanRequest = {
    rest: number, 
    trainingPlanId: string
}

export type UpdateWeekDayPlan = UpdateUseCase<WeekDayPlan, 'id' | 'trainingPlanId'>;