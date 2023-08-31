import { NotEmpty } from '@validations'
import { Exercism } from '@models/Exercism';


export type IExercismDTO = Omit<Exercism, 'id' | 'time' | 'series'>

export default class ExercismDTO implements IExercismDTO{
    @NotEmpty('Repetições')
    public repetitions: number;

    @NotEmpty('Dia da semana do exercício')
    public weekDayPlanId: string;

    @NotEmpty('A sequência do exercício')
    public sequence: number;

    constructor(repetitions: number, weekDayPlanId: string, sequence: number) {
        this.repetitions = repetitions;
        this.weekDayPlanId = weekDayPlanId;
        this.sequence = sequence
    }
}