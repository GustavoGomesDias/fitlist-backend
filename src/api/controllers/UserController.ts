import { UserDAOImp } from '@DAO';
import { IController } from './IController';
import { Inject } from '@di';
import { IRequest, IResponse } from '@http';
import { Delete, Get, Post, Put, Route } from '@routes-decorator';
import { CreateUser, UpdateUser } from '@usecases/UserUseCase';
import Catch from 'error-handler';


@Inject(['UserDAOImp'])
@Route('/user')
export default class UserController implements IController<CreateUser, UpdateUser> {

    private entityDAO: UserDAOImp;

    constructor(entityDAO?: UserDAOImp) {
        this.entityDAO = entityDAO as UserDAOImp;
    }

    @Catch()
    @Post('/')
    async create(req: IRequest<CreateUser>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }


    @Catch()
    @Put('/')
    update(req: IRequest<UpdateUser>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }

    @Catch()
    @Get('/')
    findById(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }

    @Catch()
    @Delete('/')
    delete(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    
}