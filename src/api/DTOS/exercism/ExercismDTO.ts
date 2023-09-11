import { NotEmpty } from '@validations'
import { Exercism } from '@models/Exercism';
import { CreateExercismController } from '@usecases/ExercismUseCase';

export type IExercismDTO = Omit<CreateExercismController, 'time' | 'series'>

export default class ExercismDTO implements IExercismDTO {
    @NotEmpty('Repetições')
    public serie: number;

    @NotEmpty('Dia da semana do exercício')
    public weekDayPlanId: string;

    @NotEmpty('A sequência do exercício')
    public sequence: number;

    @NotEmpty('Nome do exercício')
    public name: string;

    @NotEmpty('Descrição do exercício')
    public description: string;

    @NotEmpty('Id do usuário')
    public userId: string;

    @NotEmpty('Tempo de descanso')
    public timeOff: number;

    constructor(repetitions: number, weekDayPlanId: string, sequence: number, name: string, description: string, userId: string, timeOff: number) {
        this.serie = repetitions;
        this.weekDayPlanId = weekDayPlanId;
        this.sequence = sequence
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.timeOff = timeOff;
    }
}