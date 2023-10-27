import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../../Generic/GenericDAOImp';
import { CreateWeekDayPlan, UpdateWeekDayPlan } from '@usecases/WeekDayPlanUseCase';
import prisma from '@conn';
import IWeekDayPlanDAO from './IWeekDauyPlanDAO';

export class WeekDayPlanDAOImp extends GenericDAOImp<
    CreateWeekDayPlan,
    Prisma.userFindUniqueArgs,
    UpdateWeekDayPlan,
    string
> implements IWeekDayPlanDAO<
    CreateWeekDayPlan,
    Prisma.userFindUniqueArgs,
    UpdateWeekDayPlan,
    string
>{
    constructor() {
        super(prisma.weekDayPlan);
    }
}