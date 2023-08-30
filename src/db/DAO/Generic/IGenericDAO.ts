export interface IGenericDAO<C, R, U, D> {
    add: (data: C) => Promise<void>
    findUniqueByData: (data: R) => Promise<unknown>
    update: (data: U) => Promise<void>
    delete: (data: D) => Promise<void>
}