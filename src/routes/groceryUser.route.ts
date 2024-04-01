import {Router} from 'express'
import * as groceryController from '../controllers/grocery.controller'
import * as requestValidator from '../controllers/request.validator'
import {wrapErrHandler} from '../utils/controllerUtils'

const router = Router()

router.get('/', wrapErrHandler(groceryController.getUserItems))
router.post('/order', wrapErrHandler([requestValidator.order, groceryController.createOrder]))

export default router
