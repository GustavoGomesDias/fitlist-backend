type UpdateUseCase<T, K extends keyof T> = Partial<T> & Pick<T, K>

export default UpdateUseCase;