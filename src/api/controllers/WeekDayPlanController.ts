import { CreateWeekDayPlan, CreateWeekDayPlanRequest, UpdateWeekDayPlan } from '@usecases/WeekDayPlanUseCase';
import { IController } from './IController';
import { IRequest, IResponse } from '@http';
import { TrainingPlanDAOImp, WeekDayPlanDAOImp } from '@DAO';
import { Delete, Get, Post, Put, Route } from '@routes-decorator';
import { Inject } from '@di';
import Catch from 'error-handler';
import { CheckWekDayPlanAndUser } from '@usecases/TrainingPlanUseCase';
import { AuthRequired } from '../decorators/auth';
import WeekDayPlanDTO from '../DTOS/weekDayPlan/WeekDayPlanDTO';
import UpdateWeekDayPlanDTO from '../DTOS/weekDayPlan/UpdateWeekDayPlanDTO';
import { WeekDayPlan } from '@models/WeekDayPlan';

@Inject(['WeekDayPlanDAOImp', 'TrainingPlanDAOImp'])
@Route('/weekdayplan')
export default class WeekDayPlanController implements IController<CreateWeekDayPlanRequest, UpdateWeekDayPlan> {
    private entityDAO: WeekDayPlanDAOImp;

    private trainingDAO: TrainingPlanDAOImp;

    constructor(entityDAO?: WeekDayPlanDAOImp, trainingDAO?: TrainingPlanDAOImp) {
        this.entityDAO = entityDAO as WeekDayPlanDAOImp;
        this.trainingDAO = trainingDAO as TrainingPlanDAOImp;
    }

    @Catch()
    @AuthRequired()
    @Post('/')
    async create(req: IRequest<CreateWeekDayPlanRequest>): Promise<IResponse> {
        if (req.body) {
            const { rest, title,  trainingPlanId } = req.body;
            for (let i = 0; i < 7; i++) {

                const trainingInfo = await this.trainingDAO.checkTrainingInfoWithDay(i, trainingPlanId) as CheckWekDayPlanAndUser;
    
                if (trainingInfo.weekDayPlan.length > 0) {
                    return {
                        statusCode: 400,
                        body: {
                            error: 'Já existe um plano para o dia em questão.',
                        },
                    };
                }
    
                if (req.userId !== trainingInfo.user.id) {
                    return {
                        statusCode: 401,
                        body: {
                            error: 'Você não tem permissão para realizar essa função.',
                        },
                    };
                }

                await this.entityDAO.add({
                    day: i,
                    title,
                    rest: i === rest,
                    trainingPlanId,
                });
            }

            return {
                statusCode: 201,
                body: {
                    message: 'Plano para o dia da semana criado com sucesso!',
                },
            };

         }

         return {
            statusCode: 400,
            body: {
                error: 'Requisição sem corpo!'
            }
         }
    }
    
    @Catch()
    @Put('/')
    @AuthRequired()
    async update(req: IRequest<UpdateWeekDayPlan>): Promise<IResponse> {
        if (req.body) {
            const { id, day, rest, trainingPlanId } = req.body;
            new UpdateWeekDayPlanDTO(id as string, trainingPlanId as string, rest as boolean, day as number);
            const trainingInfo = await this.trainingDAO.checkTrainingInfoWithDay(day as number, trainingPlanId) as CheckWekDayPlanAndUser;

            if (req.userId === trainingInfo.user.id) {
                await this.entityDAO.update(req.body);
                return {
                    statusCode: 200,
                    body: {
                        message: 'Plano para o dia da semana atualizado com sucesso!',
                    },
                };
            }

            return {
                statusCode: 401,
                body: {
                    message: 'Você não tem permissão para realizar essa função.',
                },
            };

         }

         return {
            statusCode: 400,
            body: {
                error: 'Requisição sem corpo!'
            }
         }
    }
    
    @Catch()
    @AuthRequired()
    @Get('/:id')
    async findById(req: IRequest<unknown>): Promise<IResponse> {
        const weekDayPlanId = (req.params as { [key: string]: string }).id;

        const weekDayPlan = await this.entityDAO.findById(weekDayPlanId) as WeekDayPlan;

        const trainingInfo = await this.trainingDAO.checkTrainingInfoWithDay(0, weekDayPlan.trainingPlanId) as CheckWekDayPlanAndUser;

        if (req.userId === trainingInfo.user.id) {
            return {
                statusCode: 200,
                body: {
                    content: weekDayPlan,
                },
            };
        }

        return {
            statusCode: 401,
            body: {
                error: 'Você não tem autorização para acessar este dado.',
            }
        }
    }

    @Catch()
    @AuthRequired()
    @Get('/all/:id')
    async findExercismByWeekDayPlanId(req: IRequest<unknown>): Promise<IResponse> {
        const weekDayPlanId = (req.params as { [key: string]: string }).id;

        const weekDayPlan = await this.entityDAO.findUniqueByData({
            where: {
                id: weekDayPlanId,
            },

            select: {
                exercism: true,
                trainingPlanId: true,       
            },
        }) as WeekDayPlan;

        const trainingInfo = await this.trainingDAO.checkTrainingInfoWithDay(0, weekDayPlan.trainingPlanId) as CheckWekDayPlanAndUser;

        if (req.userId === trainingInfo.user.id) {
            return {
                statusCode: 200,
                body: {
                    content: weekDayPlan,
                },
            };
        }

        return {
            statusCode: 401,
            body: {
                error: 'Você não tem autorização para acessar este dado.',
            }
        }
    }

    @Catch()
    @AuthRequired()
    @Delete('/:id')
    async delete(req: IRequest<unknown>): Promise<IResponse> {
        const weekDayPlanId = (req.params as { [key: string]: string }).id;

        const weekDayPlan = await this.entityDAO.findById(weekDayPlanId) as WeekDayPlan;

        const trainingInfo = await this.trainingDAO.checkTrainingInfoWithDay(0, weekDayPlan.trainingPlanId) as CheckWekDayPlanAndUser;

        if (req.userId === trainingInfo.user.id) {

            await this.entityDAO.delete(weekDayPlanId);
            return {
                statusCode: 200,
                body: {
                    message: 'Plano de exercícios deletado.',
                },
            };
        }

        return {
            statusCode: 401,
            body: {
                error: 'Você não tem autorização para acessar este dado.',
            }
        }
    }
    
}