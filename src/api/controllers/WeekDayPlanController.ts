import { CreateWeekDayPlan, UpdateWeekDayPlan } from '@usecases/WeekDayPlanUseCase';
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
import { CheckUser } from '@validations';

@Inject(['WeekDayPlanDAOImp', 'TrainingPlanDAOImp'])
@Route('/weekdayplan')
export default class WeekDayPlanController implements IController<CreateWeekDayPlan, UpdateWeekDayPlan> {
    private entityDAO: WeekDayPlanDAOImp;

    private trainingDAO: TrainingPlanDAOImp;

    constructor(entityDAO?: WeekDayPlanDAOImp, trainingDAO?: TrainingPlanDAOImp) {
        this.entityDAO = entityDAO as WeekDayPlanDAOImp;
        this.trainingDAO = trainingDAO as TrainingPlanDAOImp;
    }

    @Catch()
    @AuthRequired()
    @Post('/')
    async create(req: IRequest<CreateWeekDayPlan>): Promise<IResponse> {
        if (req.body) {
            const { day, rest, trainingPlanId } = req.body;
            new WeekDayPlanDTO(rest, day, trainingPlanId);
            const dayExists = await this.trainingDAO.checkIfDayExists(day, trainingPlanId) as CheckWekDayPlanAndUser;

            if (dayExists.weekDayPlan.length > 0) {
                return {
                    statusCode: 400,
                    body: {
                        message: 'Já existe um plano para o dia em questão.',
                    },
                };
            }

            if (req.userId === dayExists.user.id) {
                await this.entityDAO.add(req.body);
                return {
                    statusCode: 200,
                    body: {
                        message: 'Plano para o dia da semana criado com sucesso!',
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
                message: 'Requisição sem corpo!'
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
            const dayExists = await this.trainingDAO.checkIfDayExists(day as number, trainingPlanId) as CheckWekDayPlanAndUser;

            if (req.userId === dayExists.user.id) {
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
                message: 'Requisição sem corpo!'
            }
         }
    }
    
    @Catch()
    @Get('/:id')
    async findById(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }

    @Catch()
    @Delete('/:id')
    async delete(req: IRequest<unknown>): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    
}