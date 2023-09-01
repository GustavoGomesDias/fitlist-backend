export interface IEncrypt {
    encrypt: (password: string, salt: number) => Promise<string>
    compare: (password: string, hash: string) => Promise<boolean>
}
