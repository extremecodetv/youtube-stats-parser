require('module-alias/register')

require('@utils')
require('@entities')

const parse = require('./parser')

const {
  VideoRepository,
  StatsRepository
} = require('@repositories')

const channels = [
  'UCBNlINWfd08qgDkUTaUY4_w' // ExtremeCode
]

const push = async (video) => {
  if (!video) {
    return null
  }

  const { stats } = video

  let entity = await VideoRepository.FindByVideoId(video.video_id)
  if (!entity) {
    entity = await VideoRepository.Create(video)
  }

  return StatsRepository.Create(entity._id, stats)
}

const main = async () => {
  for (let i = 0; i < channels.length; i += 1) {
    const videos = await parse(channels[i])
    const promises = videos.map(push)

    await Promise.all(promises)
  }

  return true
}

main().then(() => {
  console.log('All tasks are finished')
  process.exit(0)
})
