import { logger } from '../utils/logger'
import userModel from '../models/user.model'
import RegisterType from '../types/user.types'

export const getUserFromDB = async () => {
  return await userModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('cannot get data user from db')
      logger.error(err)
    })
}

export const addUserToDB = async (payload: RegisterType) => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email })
}
