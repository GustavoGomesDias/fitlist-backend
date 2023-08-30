import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../Generic/GenericDAOImp';
import { CreateUser, UpdateUser } from '@usecases/UserUseCase';
import prisma from '@conn';

export class UserDAOImp extends GenericDAOImp<
    CreateUser,
    Prisma.userFindUniqueArgs,
    UpdateUser,
    string
> {
    constructor() {
        super(prisma.user);
    }
}