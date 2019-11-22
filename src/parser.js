const getVideos = require('./videos')
const getStats = require('./stats')

const getAll = async (channel) => {
  let stats = []

  const videos = await getVideos(channel)
  const chunks = videos.chunk(5)
  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i]
    const temps = await Promise.all(chunk.map((url) => getStats(url)))

    stats = stats.concat(temps)
  }

  return stats
}

module.exports = getAll
