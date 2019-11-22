const puppeteer = require('puppeteer')

const autoScroll = async (page) => {
  return page.evaluate(async () => {
    const distance = 100
    const delay = 300
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance)
      await new Promise(resolve => { setTimeout(resolve, delay) })
    }
  })
}

const getVideos = async (channelId) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(`https://www.youtube.com/channel/${channelId}/videos`)
  await page.setViewport({
    width: 1200,
    height: 800
  })

  await autoScroll(page)
  await page.waitFor(1000)

  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a.ytd-thumbnail')).map(a => a.href)
  })

  browser.close()
  return result
}

module.exports = getVideos
