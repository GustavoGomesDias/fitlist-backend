import { UserDAOImp } from '@DAO';
import { Inject } from '@di';
import { IRequest } from '@http';
import { UnauthorizedErr } from '@http-errors';
import { IToken } from '@services/adapters/IToken';

@Inject(['UserDAOImp', 'Token'])
export default class Auth {
    private readonly userDAO: UserDAOImp;

    private readonly authTokenService: IToken;

    constructor(userDAO?: UserDAOImp, authTokenService?: IToken) {
        this.userDAO = userDAO as UserDAOImp;
        this.authTokenService = authTokenService as IToken;
    }

    async authentitcated(req: IRequest) {
        if (!(req).headers) {
            throw new UnauthorizedErr('Login requerido.');
        }

        const { authorization } = req.headers as { [key: string]: string };

        if (!authorization) {
            throw new UnauthorizedErr('Login requerido.');
        }

        const bearer = authorization.split(' ');
        if (bearer[0] !== 'Bearer') {
            throw new UnauthorizedErr('Tipo do token inválido.');
        }

        const [, token] = authorization.split(' ');

        const data = this.authTokenService.verify(token);
        const user = await this.userDAO.findById(data.id);

        req.userId = data.id;

        if (!user) {
            throw new UnauthorizedErr('Login requerido.');
        }
    }
}
