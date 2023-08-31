import { Restrict, NotEmpty } from '@validations'
import { WeekDayPlan } from '@models/WeekDayPlan';

export type IWeekDayPlan = Omit<WeekDayPlan, 'id'>

export default class WeekDayPlanDTO implements IWeekDayPlan{
    @NotEmpty('Dia de descanso')
    public rest: boolean;

    @Restrict([0, 1, 2, 3, 4, 5, 6], 'Dia da semana')
    public weekday: number;
    
    @NotEmpty('Id do usuário')
    public userId: string;

    @NotEmpty('Plano de treino')
    public trainingPlanId: string;

    constructor(rest: boolean, weekday: number, userId: string, trainingPlanId: string){
        this.rest = rest;
        this.weekday = weekday;
        this.userId = userId;
        this.trainingPlanId = trainingPlanId;
    }

}
