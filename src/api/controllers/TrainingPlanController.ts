import { IRequest, IResponse } from '@http';
import { IController } from './IController';
import { CreateTrainingPlan, UpdateTrainingPlan } from '@usecases/TrainingPlanUseCase';
import { Inject } from '@di';
import { Delete, Get, Post, Put, Route } from '@routes-decorator';
import { TrainingPlanDAOImp } from '@DAO';
import Catch from 'error-handler';
import TrainingPlanDTO from '../DTOS/trainingPlan/TrainingPlanDTO';
import UpdateTrainingPlanDTO from '../DTOS/trainingPlan/UpdateTrainingPlanDTO';
import { TrainingPlan } from '@models/TrainingPlan';
import { CheckUser } from '@validations';

@Inject(['TrainingPlanDAOImp'])
@Route('/trainingPlan')
export default class TrainingPlanController implements IController<CreateTrainingPlan, UpdateTrainingPlan> {

    private entityDAO: TrainingPlanDAOImp;

    constructor(entityDAO?: TrainingPlanDAOImp) {
        this.entityDAO = entityDAO as TrainingPlanDAOImp;
    }

    @Catch()
    @Post('/')
    async create(req: IRequest<CreateTrainingPlan>): Promise<IResponse> {
        if (req.body) {
            const { name, userId, description } = req.body;
            new TrainingPlanDTO(name, userId)


            await this.entityDAO.add({
                userId,
                name,
                description,
            });

            return {
                statusCode: 201,
                body: {
                    message: 'Plano de treino criado com sucesso!'
                }
            }
        }

        return {
            statusCode: 400,
            body: {
                message: 'Corpo da requisição vazio.'
            }
        }
    }

    @Catch()
    @Put('/')
    async update(req: IRequest<UpdateTrainingPlan>): Promise<IResponse> {
        if (req.body) {
            const { id, userId, name } = req.body;

            new UpdateTrainingPlanDTO(name as string, userId as string, id);

            await this.entityDAO.update(req.body)

            return {
                statusCode: 200,
                body: {
                    message: 'Plano de treino atualizado com sucesso!',
                },
            };
        }

        return {
            statusCode: 400,
            body: {
                message: 'Corpo da requisição vazio.'
            }
        }
    }

    @Catch()
    @Get('/:id')
    async findById(req: IRequest<unknown>): Promise<IResponse> {
        const planId = (req.params as { [key: string]: string }).id;
        const trainingPlan = await this.entityDAO.findById(planId) as TrainingPlan;

        if (trainingPlan) {
            return {
                statusCode: 200,
                body: {
                    content: trainingPlan,
                },
            };
        }

        return {
            statusCode: 400,
            body: {
                message: 'Plano de treino não existe.',
            },
        };
    }

    @Catch()
    @Delete('/:id')
    async delete(req: IRequest<unknown>): Promise<IResponse> {
        const planId = (req.params as { [key: string]: string }).id;
        await this.entityDAO.delete(planId);

        return {
            statusCode: 200,
            body: {
                message: 'Plano de treino deletado.',
            },
        };
    }
    @Catch()
    @Get('/all/:userId')
    async findAllByUserId(req: IRequest): Promise<IResponse> {
        const userId = (req.params as { [key: string]: string }).id;
        const trainingPlans = await this.entityDAO.findAllByUserId(userId)

        if (trainingPlans.length > 0) {
            return {
                statusCode: 200,
                body: {
                    content: trainingPlans,
                },
            };
        }

        return {
            statusCode: 400,
            body: {
                message: 'Plano de treino não existe.',
            },
        };
    }

}