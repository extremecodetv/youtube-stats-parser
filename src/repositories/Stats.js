
const _ = require('lodash')
const mongoose = require('mongoose')

const Repository = () => {
  const { Stats } = mongoose.models
  const context = this

  context.Create = async (entityId, body) => {
    return Stats.create(_.extend(body, { entityId }))
  }

  return context
}

module.exports = Repository
