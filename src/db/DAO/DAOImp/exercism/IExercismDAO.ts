import { IGenericDAO } from "../../Generic/IGenericDAO";

export default interface IExercismDAO<C, R, U, D> extends IGenericDAO<C, R, U, D> {
    findTrainingPlanId(id: string): Promise<string>
}