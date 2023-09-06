import { Exercism } from '@models/Exercism';
import UpdateUseCase from './UpdateUseCase';

export type CreateExercismDAO = Omit<Exercism, 'id'>;
export type CreateExercismController = CreateExercismDAO & {
    userId: string
}

export type UpdateExercismDAO = UpdateUseCase<Exercism, 'id'>;

export type UpdateExercismController = UpdateExercismDAO & {
    userId: string
}