/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { NextFunction, Request, Response } from 'express'
import { verifyJWT } from '../utils/jwt'

const deserializeToken = async (req: Request, res: Response, next: NextFunction) => {
  const accesToken = req.headers.authorization?.split(' ')[1]
  if (!accesToken) {
    return next()
  }

  const token: any = verifyJWT(accesToken)
  if (token.decoded) {
    res.locals.user = token.decoded
    return next()
  }

  if (token.expired) {
    return next()
  }

  return next()
}

export default deserializeToken
