
const mongoose = require('mongoose')

const Repository = () => {
  const { Video } = mongoose.models
  const context = this

  context.Create = async (payload) => {
    return Video.create(payload)
  }

  context.FindByVideoId = async (videoId) => {
    return Video.findOne({ video_id: videoId })
  }

  context.Exists = async (videoId) => {
    const count = await Video.countDocuments({ video_id: videoId })
    return (count > 0)
  }

  return context
}

module.exports = Repository
