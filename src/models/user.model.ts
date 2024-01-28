import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    username: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    role: {
      type: String,
      default: 'regular'
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
