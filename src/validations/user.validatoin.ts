import Joi from 'joi'
import UserType from '../types/porduct.types'

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().allow('', null),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string()
  })

  return schema.validate(payload)
}
export const createSessionValidatoin = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
export const refreshSessionValidatoin = (payload: UserType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })

  return schema.validate(payload)
}
