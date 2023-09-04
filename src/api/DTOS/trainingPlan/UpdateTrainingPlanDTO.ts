import { NotEmpty } from '@validations'
import { TrainingPlan } from '@models/TrainingPlan';


export default class UpdateTrainingPlanDTO implements TrainingPlan {
    @NotEmpty('ID')
    public id: string;

    @NotEmpty('Nome')
    public name: string;

    @NotEmpty('Id do usuário')
    public userId: string

    constructor(name: string, userId: string, id: string) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }
    
}