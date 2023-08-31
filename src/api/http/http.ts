export interface IRequest<UseCase = unknown> {
    body?: UseCase
    params?: any
    query?: any
    headers?: {
      authorization?: string
    }
  }

  export interface IResponse {
    statusCode: number
  
    body: {
      content?: Record<any, any>
      message?: string
      error?: string
    }
  }