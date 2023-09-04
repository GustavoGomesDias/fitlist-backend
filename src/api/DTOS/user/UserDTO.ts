import { IsEmail, Min, NotEmpty } from '@validations'
import { User } from '@models/User';

export type IUserDTO = Omit<User, 'id'>

export default class UserDTO implements IUserDTO {
    @NotEmpty('Nome')
    public name: string;

    @Min(8, 'Senha')
    public password: string;

    @IsEmail()
    public email: string;

    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}