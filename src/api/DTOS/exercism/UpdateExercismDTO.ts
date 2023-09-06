import { NotEmpty } from '@validations'
import { UpdateExercismDAO } from '@usecases/ExercismUseCase';

export type IUpdateExercismDTO = Omit<UpdateExercismDAO, 'time' | 'series'> & {
    userId: string
}

export default class UpdateExercismDTO implements IUpdateExercismDTO {
    @NotEmpty('Id do exercício')
    public id: string;

    @NotEmpty('Repetições')
    public repetitions: number;

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

    constructor(id: string, repetitions: number, weekDayPlanId: string, sequence: number, name: string, description: string, userId: string) {
        this.id = id;
        this.repetitions = repetitions;
        this.weekDayPlanId = weekDayPlanId;
        this.sequence = sequence
        this.name = name;
        this.description = description;
        this.userId = userId;
    }
}