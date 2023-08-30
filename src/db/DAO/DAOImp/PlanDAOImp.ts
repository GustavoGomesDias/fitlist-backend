import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../Generic/GenericDAOImp';
import { CreatePlan, UpdatePlan } from '@usecases/PlanUseCase';
import prisma from '@conn';

export class PlanDAOImp extends GenericDAOImp<
    CreatePlan,
    Prisma.userFindUniqueArgs,
    UpdatePlan,
    string
> {
    constructor() {
        super(prisma.plan);
    }
}