import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../Generic/GenericDAOImp';
import { CreateWeekDayPlan, UpdateWeekDayPlan } from '@usecases/WeekDayPlanUseCase';
import prisma from '@conn';

export class WeekDayPlanDAOImp extends GenericDAOImp<
    CreateWeekDayPlan,
    Prisma.userFindUniqueArgs,
    UpdateWeekDayPlan,
    string
> {
    constructor() {
        super(prisma.weekDayPlan);
    }
}