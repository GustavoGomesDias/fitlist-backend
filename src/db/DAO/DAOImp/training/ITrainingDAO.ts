import { TrainingPlan } from "@models/TrainingPlan";
import { IGenericDAO } from "../../Generic/IGenericDAO";

export default interface ITrainingDAO<C, R, U, D> extends IGenericDAO<C, R, U, D> {
    findAllByUserId(userId: string): Promise<TrainingPlan[]>
    checkTrainingInfoWithDay(day: number, trainingPlanId: string): Promise<unknown>
}