export interface IRouterDefinition {
    method: 'get' | 'post' | 'put' | 'delete'
    path: string
}

export interface IApiRouterDefinition extends IRouterDefinition {
    controllerMethod: string | symbol
}