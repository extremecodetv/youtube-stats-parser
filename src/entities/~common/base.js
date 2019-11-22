const TimeSchema = require('./time')
const { extend } = require('lodash')

const BaseSchema = extend(
  TimeSchema,
  {
    enabled: { type: Boolean, default: true, required: true }
  }
)

module.exports = BaseSchema
