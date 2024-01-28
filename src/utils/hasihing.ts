import bcrypt from 'bcrypt'

// encode
export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}
export const checkPassword = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword)
}
