import {Router} from 'express'
import * as groceryController from '../controllers/grocery.controller'
import {wrapErrHandler} from '../utils/controllerUtils'

const router = Router()

router.post('/', wrapErrHandler(groceryController.create))
router.get('/', wrapErrHandler(groceryController.getAll))
router.put('/:id', wrapErrHandler(groceryController.update))
router.delete('/:id', wrapErrHandler(groceryController.remove))
router.put('/quantity/add/:id', wrapErrHandler(groceryController.addQuantity))
router.put('/quantity/deduct/:id', wrapErrHandler(groceryController.deductQuantity))
router.put('/quantity/force-set/:id', wrapErrHandler(groceryController.forceSetQuantity))

export default router
