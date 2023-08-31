import { Exercism } from '@models/Exercism';
import UpdateUseCase from './UpdateUseCase';

export type CreateExercism = Omit<Exercism, 'id'>;

export type UpdateExercism = UpdateUseCase<Exercism, 'id'>;