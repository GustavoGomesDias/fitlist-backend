import { IsEmail, Min, NotEmpty } from '@validations'
import { User } from '@models/User';

export default class UpdateUserDTO implements Omit<User, 'password'> {
    @NotEmpty('ID')
    public id: string;

    @NotEmpty('Nome')
    public name: string;

    @IsEmail()
    public email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}