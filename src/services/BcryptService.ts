import { IEncrypt } from './adapters/IEncrypt';
import bcrypt from 'bcrypt';

export default class BcryptServices implements IEncrypt {
    async encrypt(password: string, salt: number): Promise<string> {
        const hash = await bcrypt.hash(password, salt);

        return hash
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
    
}