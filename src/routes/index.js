import {Router} from 'express'
import groceryAdminRoute from './groceryAdmin.route'
import groceryUserRoute from './groceryUser.route'

const router = Router()

router.use('/admin/grocery', groceryAdminRoute)
router.use('/grocery', groceryUserRoute)

export default router
