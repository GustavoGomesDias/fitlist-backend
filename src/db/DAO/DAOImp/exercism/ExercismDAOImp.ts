import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../../Generic/GenericDAOImp';
import { CreateExercismDAO, UpdateExercismDAO } from '@usecases/ExercismUseCase';
import prisma from '@conn';
import IExercismDAO from './IExercismDAO';

export interface FindTrainingPlanId {
    weekDayPlan: {
        trainingPlanId: string
    }
}

export class ExercismDAOImp extends GenericDAOImp<
    CreateExercismDAO,
    Prisma.userFindUniqueArgs,
    UpdateExercismDAO,
    string
> implements IExercismDAO <
    CreateExercismDAO,
    Prisma.userFindUniqueArgs,
    UpdateExercismDAO,
    string
>{
    constructor() {
        super(prisma.exercism);
    }


    async findTrainingPlanId(id: string): Promise<string> {
        const exercismTrainingPlanId = await prisma.exercism.findUnique({
            where: {
                id,
            },

            select: {
                weekDayPlan: {
                    select: {
                        trainingPlanId: true,
                    },
                },
            },
        }) as unknown as FindTrainingPlanId;

        return exercismTrainingPlanId.weekDayPlan.trainingPlanId;
    }
}