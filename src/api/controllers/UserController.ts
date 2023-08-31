import { UserDAOImp } from '@DAO';
import { IController } from './IController';
import { Inject } from '@di';
import { IRequest, IResponse } from '@http';
import { Get, Post, Route } from '@routes-decorator';
import { CreateUser, UpdateUser } from '@usecases/UserUseCase';
import Catch from 'error-handler';


@Inject(['UserDAOImp'])
@Route('/user')
export default class UserController implements IController<CreateUser, UpdateUser> {

    private entityDAO: UserDAOImp;

    constructor(entityDAO?: UserDAOImp) {
        this.entityDAO = entityDAO as UserDAOImp;
    }

    @Get('/')
    test(req: IRequest): IResponse {
        return  {
            statusCode: 200,
            body: {
                message: 'Tested',
            }
        }
    }

    // @Catch()
    // @Post('/')
    async create(req: IRequest<CreateUser>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }


    update(req: IRequest<UpdateUser>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    findById(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    delete(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    
}