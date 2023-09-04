import { UserDecodePayload } from '@usecases/UserUseCase';
import { IToken } from './adapters/IToken';
import jwt from 'jsonwebtoken'
import { UnauthorizedErr } from '@http-errors';

export default class JwtService implements IToken {
    sign(payload: UserDecodePayload, expiresIn: string | number): string {
        return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
            expiresIn,
        })
    }
    verify(token: string): UserDecodePayload {
        const payload = jwt.verify(token, `${process.env.JWT_SECRET}` as string, (err, decoded) => {
            if (err) {
                throw new UnauthorizedErr('Token espirado.');
            }

            return decoded as UserDecodePayload;
        }) as unknown as UserDecodePayload;

        const { id, email, name } = payload;
        return {
            id,
            email,
            name,
        };
    }

}