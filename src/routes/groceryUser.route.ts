import {Router} from 'express'
import * as groceryController from '../controllers/grocery.controller'
import {wrapErrHandler} from '../utils/controllerUtils'

const router = Router()

router.get('/', wrapErrHandler(groceryController.getUserItems))
router.post('/order', wrapErrHandler(groceryController.createOrder))

export default router
