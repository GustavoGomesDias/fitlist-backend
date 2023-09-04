import { Restrict, NotEmpty, NotUndefined } from '@validations'
import { WeekDayPlan } from '@models/WeekDayPlan';

export type IWeekDayPlan = Omit<WeekDayPlan, 'id'>

export default class WeekDayPlanDTO implements IWeekDayPlan{
    @NotUndefined('Dia de descanso')
    public rest: boolean;

    @Restrict([0, 1, 2, 3, 4, 5, 6], 'Dia da semana')
    public day: number;

    @NotEmpty('Plano de treino')
    public trainingPlanId: string;

    constructor(rest: boolean, weekday: number, trainingPlanId: string){
        this.rest = rest;
        this.day = weekday;
        this.trainingPlanId = trainingPlanId;
    }

}
