import { ExercismDAOImp, FindTrainingPlanId, TrainingPlanDAOImp } from "@DAO";
import { BadRequestErr } from "@http-errors";
import { TrainingPlan } from "@models/TrainingPlan";

export type CheckUserParams = {
	type: 'body' | 'params' | 'weekDayPlan' | 'exercism' | 'trainingPlan' | 'exercismBody'
}


export const CheckUser = ({ type }: CheckUserParams) => (target: any, key: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any) {

		const trainingPlanDAO = new TrainingPlanDAOImp();
		const exercismDAO = new ExercismDAOImp();

		switch (type) {
			case 'body':
				console.log(args[0].userId);
				console.log(args[0].body.id);
				if (args[0].body.id !== args[0].userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;

			case 'exercismBody':
				if (args[0].body.userId !== args[0].userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;
			case 'params':
				if (args[0].params.id !== args[0].userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;
			case 'trainingPlan':
				const trainingInfo = await trainingPlanDAO.findById(args[0].params.id) as TrainingPlan;
				if (args[0].userId !== trainingInfo.userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;
			case 'exercism':
				const exercismId = args[0].params.id;
				const trainingPlanId = await exercismDAO.findTrainingPlanId(exercismId);
				const trainingExerInfo = await trainingPlanDAO.findById(trainingPlanId) as TrainingPlan;
				if (args[0].userId !== trainingExerInfo.userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;

			default:
				break;
		}

		if (type === 'trainingPlan') {

		}

		return await originalMethod.apply(this, args);
	};

	return descriptor;
};