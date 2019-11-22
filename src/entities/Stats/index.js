
const { extend } = require('lodash')
const mongoose = require('mongoose')
const { TimeSchema } = require('./../~common')

const { ObjectId } = mongoose.Schema.Types

const schema = mongoose.Schema(
  extend(
    {
      entityId: { type: ObjectId, ref: 'Video' },
      rating: { type: Number },
      views: { type: Number },
      likes: { type: Number },
      dislikes: { type: Number }
    },
    TimeSchema
  )
)

module.exports = mongoose.model('Stats', schema)
