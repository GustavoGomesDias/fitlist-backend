import { NotEmpty } from '@validations'
import { TrainingPlan } from '@models/TrainingPlan';

export type ITrainingPlanDTO = Omit<TrainingPlan, 'id' | 'description'>

export default class TrainingPlanDTO implements ITrainingPlanDTO {
    @NotEmpty('Nome do treino')
    public name: string;

    @NotEmpty('Id do usuário')
    public userId: string;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId;
    }
    
}