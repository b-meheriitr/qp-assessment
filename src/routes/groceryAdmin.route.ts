import {Router} from 'express'
import * as groceryController from '../controllers/grocery.controller'
import * as requestValidator from '../controllers/request.validator'
import {wrapErrHandler} from '../utils/controllerUtils'

const router = Router()

router.post('/', wrapErrHandler([requestValidator.create, groceryController.create]))
router.get('/', wrapErrHandler(groceryController.getAll))
router.put('/:id', wrapErrHandler([requestValidator.update, groceryController.update]))
router.delete('/:id', wrapErrHandler(groceryController.remove))
router.put('/quantity/add/:id', wrapErrHandler([requestValidator.quantity, groceryController.addQuantity]))
router.put('/quantity/deduct/:id', wrapErrHandler([requestValidator.quantity, groceryController.deductQuantity]))
router.put('/quantity/force-set/:id', wrapErrHandler([requestValidator.quantity, groceryController.forceSetQuantity]))

export default router
