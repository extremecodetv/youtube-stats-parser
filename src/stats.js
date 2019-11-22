const puppeteer = require('puppeteer')

const transform = (data) => {
  const sentiments = data.player.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.sentimentBar.sentimentBarRenderer.tooltip.split('/').map(s => Number(s.replace(/\s/g, '')))

  const result = {
    title: data.meta.title,
    author: data.meta.author,
    video_id: data.meta.video_id,
    length_seconds: Number(data.meta.length_seconds),
    keywords: data.meta.player_response.videoDetails.keywords,
    description: data.meta.player_response.videoDetails.shortDescription,
    date: data.meta.player_response.microformat.playerMicroformatRenderer.uploadDate,
    category: data.meta.player_response.microformat.playerMicroformatRenderer.category,
    channel_id: data.meta.player_response.microformat.playerMicroformatRenderer.externalChannelId,
    stats: {
      rating: data.meta.player_response.videoDetails.averageRating,
      views: Number(data.meta.player_response.videoDetails.viewCount),
      likes: sentiments[0],
      dislikes: sentiments[1]
    }
  }

  return result
}

const clientParser = () => {
  const raw = document.querySelector('#player').innerHTML

  // Some JS magick :D
  const script = `function ev () { ${raw.substring(
    raw.lastIndexOf('<script>') + 8,
    raw.lastIndexOf('</script>')
  )} return ytplayer } ev()`

  const meta = eval(script) // eslint-disable-line

  meta.config.args.player_response = JSON.parse(meta.config.args.player_response)
  const player = window.ytInitialData

  return {
    meta: meta.config.args,
    player
  }
}

const getStats = async (url) => {
  if (!url) {
    return null
  }

  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()

    await page.goto(url)
    await page.setViewport({
      width: 1200,
      height: 800
    })

    await page.waitFor(1000)

    let result = await page.evaluate(clientParser)

    result = transform(result)
    return result
  } catch (e) {
    return null
  } finally {
    browser.close()
  }
}

module.exports = getStats
