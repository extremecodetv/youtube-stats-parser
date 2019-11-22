
const TimeSchema = {
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
}

module.exports = TimeSchema
