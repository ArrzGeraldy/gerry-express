// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response, NextFunction, Router } from 'express'
import { logger } from '../utils/logger'

export const HealthRouter: Router = Router()

HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Health check succes')
  res.status(200).send({ status: 200 })
})
HealthRouter.get('/coba', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'coba' })
})
