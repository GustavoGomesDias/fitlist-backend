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
import { IEncrypt } from '@services/adapters/IEncrypt';
import { AuthRequired } from '../decorators/auth';
import { CheckUser } from '@validations';


@Inject(['UserDAOImp', 'Encrypt'])
@Route('/user')
export default class UserController implements IController<CreateUser, UpdateUser> {

    private entityDAO: UserDAOImp;
    private encryptService: IEncrypt;

    constructor(entityDAO?: UserDAOImp, encrypt?: IEncrypt) {
        this.entityDAO = entityDAO as UserDAOImp;
        this.encryptService = encrypt as IEncrypt;
    }

    @Catch()
    @Post('/')
    async create(req: IRequest<CreateUser>): Promise<IResponse> {
        if (req.body) {
            const { email, name, password } = req.body;
            new UserDTO(name, password, email)

            const hash = await this.encryptService.encrypt(password, 12);

            await this.entityDAO.add({
                email,
                name,
                password: hash,
            });

            return {
                statusCode: 201,
                body: {
                    message: 'Usuário criado com sucesso!'
                }
            }
        }

        return {
            statusCode: 400,
            body: {
                message: 'Corpo da requisição vazio.'
            }
        }
    }


    @Catch()
    @AuthRequired()
    @CheckUser({ type: 'body' })
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
            statusCode: 400,
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

        if (user) {
            return {
                statusCode: 200,
                body: {
                    content: {
                        email: user.email,
                        name: user.name,
                        id: user.id,
                    },
                },
            };
        }

        return {
            statusCode: 400,
            body: {
                message: 'Usuário não existe.',
            },
        };
    }

    @Catch()
    @AuthRequired()
    @CheckUser({ type: 'params' })
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