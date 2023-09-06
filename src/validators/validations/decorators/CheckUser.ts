import { TrainingPlanDAOImp } from "@DAO";
import { BadRequestErr } from "@http-errors";
import { TrainingPlan } from "@models/TrainingPlan";

export type CheckUserParams = {
	type: 'body' | 'params' | 'weekDayPlan' | 'exercism' | 'trainingPlan'
}


export const CheckUser = ({ type }: CheckUserParams) => (target: any, key: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any) {

		const trainingPlan = new TrainingPlanDAOImp();

		switch (type) {
			case 'body':
				if (args[0].body.id !== args[0].userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;
			case 'params':
				if (args[0].params.id !== args[0].userId) {
					throw new BadRequestErr('Ação inválida.');
				}
				break;
			case 'trainingPlan':
				const trainingInfo = await trainingPlan.findById(args[0].params.id) as TrainingPlan;
				if (args[0].userId !== trainingInfo.userId) {
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