import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../../Generic/GenericDAOImp';
import { CreateWeekDayPlan, UpdateWeekDayPlan } from '@usecases/WeekDayPlanUseCase';
import prisma from '@conn';
import IWeekDayPlanDAO from './IWeekDauyPlanDAO';

export class WeekDayPlanDAOImp extends GenericDAOImp<
    CreateWeekDayPlan,
    Prisma.weekDayPlanFindUniqueArgs,
    UpdateWeekDayPlan,
    string
> implements IWeekDayPlanDAO<
    CreateWeekDayPlan,
    Prisma.weekDayPlanFindUniqueArgs,
    UpdateWeekDayPlan,
    string
>{
    constructor() {
        super(prisma.weekDayPlan);
    }
}