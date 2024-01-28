import jwt from 'jsonwebtoken'
import CONFIG from '../config/enviroment'

// eslint-disable-next-line @typescript-eslint/ban-types
export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return jwt.sign(payload, CONFIG.jwt_private!, {
    ...(options && options)
  })
}

export const verifyJWT = (token: any) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const decoded = jwt.verify(token, CONFIG.jwt_private!)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}
