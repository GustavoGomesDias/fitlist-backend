import { IRequest, IResponse } from '@http';

export interface IController<CreteUseCase = unknown, UpdateUseCase = unknown> {
    create(req: IRequest<CreteUseCase>): Promise<IResponse>
    update(req: IRequest<UpdateUseCase>): Promise<IResponse>
    findById(req: IRequest): Promise<IResponse>
    delete(req: IRequest): Promise<IResponse>
}