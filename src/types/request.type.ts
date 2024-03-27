import {ErrorRequestHandler, RequestHandler} from 'express'

export type HandlerType = RequestHandler | ErrorRequestHandler
