import { IRequest, IResponse } from '@http';
import { IController } from './IController';
import { Delete, Get, Post, Put, Route } from '@routes-decorator';
import Catch from 'error-handler';
import { AuthRequired } from '../decorators/auth';
import { CreateExercismController, UpdateExercismController, UpdateExercismDAO } from '@usecases/ExercismUseCase';
import ExercismDTO from '../DTOS/exercism/ExercismDTO';
import { CheckUser } from '@validations';
import { ExercismDAOImp } from '@DAO';
import { Inject } from '@di';
import UpdateExercismDTO from '../DTOS/exercism/UpdateExercismDTO';
import { Exercism } from '@models/Exercism';

@Inject(['ExercismDAOImp'])
@Route('/exercism')
export default class ExercismController implements IController<CreateExercismController, UpdateExercismController> {

    public entityDAO: ExercismDAOImp;

    constructor(entityDAO?: ExercismDAOImp) {
        this.entityDAO = entityDAO as ExercismDAOImp;
    }

    @Catch()
    @Post('/')
    @AuthRequired()
    @CheckUser({ type: 'body' })
    async create(req: IRequest<CreateExercismController>): Promise<IResponse> {
        if (req.body) {
            const { userId, ...rest } = req.body;

            const { description, weekDayPlanId, name, repetitions, sequence } = rest;
            new ExercismDTO(repetitions, weekDayPlanId, sequence, name, description, userId);

            await this.entityDAO.add(rest);

            return {
                statusCode: 201,
                body: {
                    message: 'Exercício criado com sucesso.',
                },
            };

        }

        return {
            statusCode: 400,
            body: {
                error: 'Requisição sem corpo!',
            },
        };
    }

    @Catch()
    @Put('/')
    @AuthRequired()
    @CheckUser({ type: 'body' })
    async update(req: IRequest<UpdateExercismController>): Promise<IResponse> {
        if (req.body) {
            const { id, userId, description, name, repetitions, sequence, series, time, weekDayPlanId } = req.body;

            new UpdateExercismDTO(id, repetitions as number, weekDayPlanId as string, sequence as number, name as string, description as string, userId as string);

            await this.entityDAO.update(req.body)

            return {
                statusCode: 200,
                body: {
                    message: 'Exercício atualizado com sucesso!',
                },
            };
        }

        return {
            statusCode: 400,
            body: {
                error: 'Corpo da requisição vazio.'
            }
        }
    }

    @Catch()
    @Get('/:id')
    @AuthRequired()
    @CheckUser({ type: 'exercism' })
    async findById(req: IRequest<unknown>): Promise<IResponse> {
        const exercismId = (req.params as { [key: string]: string }).id;

        const exercism = await this.entityDAO.findById(exercismId) as Exercism;

        return {
            statusCode: 200,
            body: {
                content: exercism,
            },
        };
    }

    @Catch()
    @Delete('/:id')
    @AuthRequired()
    @CheckUser({ type: 'exercism' })
    async delete(req: IRequest<unknown>): Promise<IResponse> {
        const exercismId = (req.params as { [key: string]: string }).id;

        await this.entityDAO.delete(exercismId);

        return {
            statusCode: 200,
            body: {
                message: 'Exercício deletado.'
            }
        }
    }

}