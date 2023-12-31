import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../../Generic/GenericDAOImp';
import { CreateTrainingPlan, UpdateTrainingPlan } from '@usecases/TrainingPlanUseCase';
import prisma from '@conn';
import { TrainingPlan } from '@models/TrainingPlan';
import ITrainingDAO from './ITrainingDAO';

export class TrainingPlanDAOImp extends GenericDAOImp<
    CreateTrainingPlan,
    Prisma.trainingPlanFindUniqueArgs,
    UpdateTrainingPlan,
    string
> implements ITrainingDAO<
    CreateTrainingPlan,
    Prisma.trainingPlanFindUniqueArgs,
    UpdateTrainingPlan,
    string
>{
    constructor() {
        super(prisma.trainingPlan);
    }

    async findAllByUserId(userId: string): Promise<TrainingPlan[]> {
        const plans = await this.entity.findMany({
            where: {
              userId,
            } ,
            orderBy: {
                createdAt: 'desc'
            },
          }) as unknown as TrainingPlan[];

        return plans
    }


    async checkTrainingInfoWithDay(day: number, trainingPlanId: string): Promise<unknown> {
        const result = await this.entity.findUnique({
            where: {
                id: trainingPlanId,
            },

            select: {
                weekDayPlan: {
                    where: {
                        day,
                    },
                },

                user: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return result;
    }
}