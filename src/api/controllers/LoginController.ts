import { UserDAOImp } from '@DAO';
import { IRequest, IResponse } from '@http';
import { Post, Route } from '@routes-decorator';
import { IToken } from '@services/adapters/IToken';
import { UserLogin } from '@usecases/UserUseCase';
import Catch from 'error-handler';
import UserDTO from '../DTOS/user/UserDTO';
import { IEncrypt } from '@services/adapters/IEncrypt';
import { Inject } from '@di';
import { IController } from './IController';

@Inject(['UserDAOImp', 'Token', 'Encrypt'])
@Route('/login')
export default class LoginController implements IController {
    private readonly entityDAO: UserDAOImp;
    private readonly tokenService: IToken;
    private readonly encryptService: IEncrypt;

    constructor(entityDAO?: UserDAOImp, tokenService?: IToken, encryptService?: IEncrypt) {
        this.entityDAO = entityDAO as UserDAOImp;
        this.tokenService = tokenService as IToken;
        this.encryptService = encryptService as IEncrypt;
    }
    create(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    update(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    findById(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    delete(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }

    @Catch()
    @Post('/')
    async login(req: IRequest<UserLogin>): Promise<IResponse> {
        if (req.body) {
            const { email, password } = req.body;

            new UserDTO('name', password, email);

            const user = await this.entityDAO.findByEmail(email);

            if (user) {
                const comparation = await this.encryptService.compare(password, user.password);

                if (comparation) {
                    const payload = await this.tokenService.sign({
                        email: user.email,
                        id: user.id,
                        name: user.name,
                    }, '2d');

                    return {
                        statusCode: 200,
                        body: {
                            content: {
                                token: payload,
                            },
                        },
                    };
                }

                return {
                    statusCode: 401,
                    body: {
                        message: 'Usuário inválido.',
                    },
                };


            }

            return {
                statusCode: 401,
                body: {
                    message: 'Usuário inválido.',
                },
            };
        }

        return {
            statusCode: 400,
            body: {
                message: 'Requisição vazia!',
            },
        };
    }
}