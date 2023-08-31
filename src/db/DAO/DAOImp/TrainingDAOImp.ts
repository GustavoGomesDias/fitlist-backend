import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../Generic/GenericDAOImp';
import { CreateTrainingPlan, UpdateTrainingPlan } from '@usecases/TrainingPlanUseCase';
import prisma from '@conn';

export class TrainingPlanDAOImp extends GenericDAOImp<
    CreateTrainingPlan,
    Prisma.trainingPlanFindUniqueArgs,
    UpdateTrainingPlan,
    string
> {
    constructor() {
        super(prisma.trainingPlan);
    }
}