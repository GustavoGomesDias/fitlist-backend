import { Restrict, NotEmpty, NotUndefined } from '@validations'
import { WeekDayPlan } from '@models/WeekDayPlan';

export type IWeekDayPlan = Omit<WeekDayPlan, 'id'>

export default class WeekDayPlanDTO{
    @Restrict([0, 1, 2, 3, 4, 5, 6], 'Dia de descanso')
    public rest: number;

    @NotEmpty('Plano de treino')
    public trainingPlanId: string;

    constructor(rest: number, trainingPlanId: string){
        this.rest = rest;
        this.trainingPlanId = trainingPlanId;
    }

}
