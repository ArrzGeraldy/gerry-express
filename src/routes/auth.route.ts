import { Router } from 'express'
import { registerUser, getUser, sessionUser, refreshSession } from '../controllers/auth.controller'
// import { getUser } from '../controllers/user.controller'

export const AuthRouter: Router = Router()

AuthRouter.get('/', getUser)
AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', sessionUser)
AuthRouter.post('/refresh', refreshSession)
