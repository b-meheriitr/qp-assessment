import {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from 'express'
import {HandlerType} from '../types/request.type'

const wrap = (fn: HandlerType): HandlerType => {
	if (fn.length === 4) {
		return async (err: Error, req: Request, res: Response, next: NextFunction) => {
			try {
				await (fn as ErrorRequestHandler)(err, req, res, next)
			} catch (e) {
				next(e)
			}
		}
	}

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await (fn as RequestHandler)(req, res, next)
		} catch (err) {
			next(err)
		}
	}
}

export function wrapErrHandler(fns: HandlerType | HandlerType[]): HandlerType[] {
	return Array.isArray(fns)
	       ? fns.map(wrap)
	       : [wrap(fns)]
}
