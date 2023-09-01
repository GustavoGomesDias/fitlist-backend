import { IsEmail, Min, NotEmpty } from '@validations'
import { User } from '@models/User';

export default class UpdateUserDTO implements User {
    @NotEmpty('ID')
    public id: string;

    @NotEmpty('Nome')
    public name: string;

    @Min(8, 'Senha')
    public password: string;

    @IsEmail()
    public email: string;

    constructor(id: string, name: string, password: string, email: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }
}