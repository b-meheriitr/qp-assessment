import {NextFunction, Request, Response, Router} from 'express'
import {wrapErrHandler} from '../utils/controllerUtils'

const router = Router()

router.get('/', wrapErrHandler((req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({msg: 'hello test'})
}))

export default router
