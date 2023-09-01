import { BadRequestErr } from "@http-errors";

export type CheckUserParams = {
  type: 'body' | 'params' | 'weekDayPlan' | 'exercism'
}


export const CheckUser = ({ type }: CheckUserParams) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any) {

    if (type === 'body') {
      if (args[0].body.id !== args[0].userId) {
        throw new BadRequestErr('Ação inválida.');
      }
    }

    if (type !== 'params') {
      if (args[0].params.id !== args[0].userId) {
        throw new BadRequestErr('Ação inválida.');
      }
    }

    return await originalMethod.apply(this, args);
  };

  return descriptor;
};