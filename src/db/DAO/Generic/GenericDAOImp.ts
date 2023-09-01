import { IDelegate } from './IDelegate';
import { IGenericDAO } from './IGenericDAO';

export class GenericDAOImp<C, R, U, D> implements IGenericDAO<C, R, U, D> {
    protected readonly entity: IDelegate;

    constructor(entity: IDelegate) {
        this.entity = entity;
    }

    async findById(id: string): Promise<unknown> {
        const result = await this.entity.findUnique({
            where: {
                id
            }
        } as unknown as R)
        return result;
    }    

    async findUniqueByData(data: R): Promise<unknown> {
        const result = await this.entity.findUnique(data)
        return result;
    }

    async add(data: C): Promise<void> {
        await this.entity.create({
            data
        });
    }

    async update(data: U): Promise<void> {
        const { id, ...rest } = (data as { [key: string]: U });
        await this.entity.update({
			where: {
				id: id as string
			},

			data: {
				...rest
			}
		});
    }

    async delete(data: D): Promise<void> {
		await this.entity.delete({
			where: {
				id: data,
			},
		});
	}
}