import { Request, Response } from 'express'
import { addUserToDB, findUserByEmail, getUserFromDB } from '../services/userService'
import { createSessionValidatoin, createUserValidation, refreshSessionValidatoin } from '../validations/user.validatoin'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hasihing'
import { signJWT, verifyJWT } from '../utils/jwt'

export const getUser = async (req: Request, res: Response) => {
  const users = await getUserFromDB()
  if (users) {
    return res.status(200).send({
      type: true,
      statusCode: 200,
      data: users
    })
  }
}

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()

  const { error, value } = createUserValidation(req.body)
  if (error) {
    logger.info(`ERR - create user = ${error.details[0].message}`)
    return res.status(400).send({
      type: false,
      statusCode: 400,
      message: error.details[0].message
    })
  }
  try {
    value.password = hashing(value.password)
    await addUserToDB(value)
    return res.status(201).send({
      type: true,
      statusCode: 201,
      message: 'succes add user'
    })
  } catch (err) {
    return res.status(400).send({
      type: true,
      statusCode: 400,
      message: error
    })
  }
}

export const sessionUser = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidatoin(req.body)
  if (error) {
    logger.info(`ERR - create user = ${error.details[0].message}`)
    return res.status(400).send({
      type: false,
      statusCode: 400,
      message: error.details[0].message
    })
  }

  try {
    const user: any = await findUserByEmail(value.email)
    const isValid = checkPassword(value.password, user.password)
    if (!isValid) return res.status(401).json({ status: false, statusCode: 401, message: 'invalid email or password' })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const secret = process.env.PRIVATE_JWT!
    // const expired = 60 * 60 * 2
    // const token = jwt.sign({ user }, secret, { expiresIn: expired })
    const accesToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })
    return res.status(200).send({
      type: true,
      statusCode: 200,
      message: 'succes login',
      data: { accesToken, refreshToken }
    })
  } catch (error: any) {
    return res.status(400).send({
      type: false,
      statusCode: 400,
      message: error.message
    })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidatoin(req.body)
  if (error) {
    logger.info(`ERR - login user = ${error.details[0].message}`)
    return res.status(400).send({
      type: false,
      statusCode: 400,
      message: error.details[0].message
    })
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken)

    const user = findUserByEmail(decoded._doc.email)
    if (!user) return false

    const accesToken = signJWT({ ...user }, { expiresIn: '1d' })
    return res.status(200).send({
      type: true,
      statusCode: 200,
      message: 'succes login',
      data: { accesToken }
    })
  } catch (error: any) {
    return res.status(400).send({
      type: false,
      statusCode: 400,
      message: error.message
    })
  }
}
