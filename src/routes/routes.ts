import express from 'express'
import { checkTokenController } from '../controllers/checkTokenController'
import { getUsersController } from '../controllers/getUsersController'
import { loginSessionController } from '../controllers/loginSessionController'
import { DolarBlueController } from '../controllers/dolarBlueController'

const routes = express.Router()

const dolarBlueController = new DolarBlueController
routes.get('/dolar/blue', dolarBlueController.get)

routes.get('/users', getUsersController)

routes.get('/check-token/:rol', checkTokenController)

routes.get('/user-login', loginSessionController)


export default routes
