import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../Generic/GenericDAOImp';
import { CreateExercism, UpdateExercism } from '@usecases/ExercismUseCase';
import prisma from '@conn';

export class ExercismnDAOImp extends GenericDAOImp<
    CreateExercism,
    Prisma.userFindUniqueArgs,
    UpdateExercism,
    string
> {
    constructor() {
        super(prisma.exercism);
    }
}