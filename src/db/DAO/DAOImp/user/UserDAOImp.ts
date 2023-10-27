import { Prisma } from '@prisma/client';
import { GenericDAOImp } from '../../Generic/GenericDAOImp';
import { CreateUser, UpdateUser } from '@usecases/UserUseCase';
import prisma from '@conn';
import { User } from '@models/User';
import IUserDAO from './IUserDAO';

export class UserDAOImp extends GenericDAOImp<
    CreateUser,
    Prisma.userFindUniqueArgs,
    UpdateUser,
    string
> implements IUserDAO <
    CreateUser,
    Prisma.userFindUniqueArgs,
    UpdateUser,
    string
>{
    constructor() {
        super(prisma.user);
    }


    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.entity.findUnique({
            where: {
                email
            }
        }) as unknown as User

        return user;
    }
}