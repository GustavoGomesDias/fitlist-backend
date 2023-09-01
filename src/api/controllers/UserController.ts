import { UserDAOImp } from '@DAO';
import { IController } from './IController';
import { Inject } from '@di';
import { IRequest, IResponse } from '@http';
import { Delete, Get, Post, Put, Route } from '@routes-decorator';
import { CreateUser, UpdateUser } from '@usecases/UserUseCase';
import Catch from 'error-handler';
import UserDTO from '../DTOS/user/UserDTO';
import UpdateUserDTO from '../DTOS/user/UpdateUserDTO';
import { User } from '@models/User';


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
        if (req.body) {
            const { email, name, password } = req.body;
            new UserDTO(name, password, email)

            await this.entityDAO.add({
                email,
                name,
                password,
            });

            return {
                statusCode: 201,
                body: {
                    message: 'Usuário criado com sucesso!'
                }
            }
        }

        return {
            statusCode: 404,
            body: {
                message: 'Corpo da requisição vazio.'
            }
        }
    }


    @Catch()
    @Put('/')
    async update(req: IRequest<UpdateUser>): Promise<IResponse> {
        if (req.body) {
            const { id, email, name, password } = req.body;

            new UpdateUserDTO(id, name as string, password as string, email as string);

            await this.entityDAO.update(req.body)

            return {
                statusCode: 200,
                body: {
                    message: 'Usuário atualizado com sucesso!',
                },
            };
        }

        return {
            statusCode: 404,
            body: {
                message: 'Corpo da requisição vazio.'
            }
        }
    }

    @Catch()
    @Get('/:id')
    async findById(req: IRequest<unknown>): Promise<IResponse> {
        const userId = (req.params as { [key: string]: string }).id;
        const user = await this.entityDAO.findById(userId) as User;

        return {
            statusCode: 200,
            body: {
                content: user,
            },
        };
    }

    @Catch()
    @Delete('/:id')
    async delete(req: IRequest<unknown>): Promise<IResponse> {
        const userId = (req.params as { [key: string]: string }).id;
        await this.entityDAO.delete(userId);

        return {
            statusCode: 200,
            body: {
                message: 'Usuário deletado.',
            },
        };
    }
    
}