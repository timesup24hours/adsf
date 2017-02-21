import { mongoose, Schema, config } from '../../db'

const User = new Schema({
  local: {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
})

export default mongoose.model('User', User)
