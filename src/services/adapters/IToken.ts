import { UserDecodePayload } from '@usecases/UserUseCase';

export interface IToken {
    sign(payload: UserDecodePayload, expiresIn: string | number): string
    verify(token: string): UserDecodePayload
}