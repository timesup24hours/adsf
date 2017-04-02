import { mongoose, Schema } from '../../db'

const Department = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
})

export default mongoose.model('Department', Department)
