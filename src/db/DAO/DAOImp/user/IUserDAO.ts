import { User } from "@models/User";
import { IGenericDAO } from "../../Generic/IGenericDAO";

export default interface IUserDAO<C, R, U, D> extends IGenericDAO<C, R, U, D> {
    findByEmail(email: string): Promise<User | undefined>
}