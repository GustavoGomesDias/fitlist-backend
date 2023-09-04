import { Restrict, NotEmpty, NotUndefined } from '@validations'
import { WeekDayPlan } from '@models/WeekDayPlan';

export type IWeekDayPlan = Omit<WeekDayPlan, 'id' | 'trainingPlanId'> & {
    id: string,
    trainingPlanId: string
}

export default class UpdateWeekDayPlanDTO implements IWeekDayPlan {
    @NotEmpty('ID')
    public id: string;

    @NotEmpty('ID do plano de treino')
    public trainingPlanId: string;

    @NotUndefined('Dia de descanso')
    public rest: boolean;

    @Restrict([0, 1, 2, 3, 4, 5, 6], 'Dia da semana')
    public day: number;

    constructor(id: string, trainingPlanId: string, rest: boolean, weekday: number){
        this.rest = rest;
        this.day = weekday;
        this.id = id;
        this.trainingPlanId = trainingPlanId;
    }

}
