import { CreateWeekDayPlan, UpdateWeekDayPlan } from '@usecases/WeekDayPlanUseCase';
import { IController } from './IController';
import { IRequest, IResponse } from '@http';
import { TrainingPlanDAOImp, WeekDayPlanDAOImp } from '@DAO';
import { Delete, Get, Post, Put, Route } from '@routes-decorator';
import { Inject } from '@di';
import Catch from 'error-handler';

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
    @Post('/')
    async create(req: IRequest<CreateWeekDayPlan>): Promise<IResponse> {
        if (req.body) {
            const { weekday, rest, trainingPlanId } = req.body;
            const checkIfDayExists = await this.trainingDAO.checkIfDayExists(weekday, trainingPlanId)
            // if ()
         }

         return {
            statusCode: 200,
            body: {
                message: 'ok'
            }
         }
    }
    
    @Catch()
    @Put('/')
    async update(req: IRequest<UpdateWeekDayPlan>): Promise<IResponse> {
        throw new Error('Method not implemented.');
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