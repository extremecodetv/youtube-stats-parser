
const { extend } = require('lodash')
const mongoose = require('mongoose')
const { TimeSchema } = require('./../~common')

const schema = mongoose.Schema(
  extend(
    {
      title: { type: String },
      author: { type: String },
      video_id: { type: String },
      length_seconds: { type: Number },
      keywords: [{ type: String }],
      description: { type: String },
      date: { type: Date },
      category: { type: String },
      channel_id: { type: String }
    },
    TimeSchema
  )
)

module.exports = mongoose.model('Video', schema)
