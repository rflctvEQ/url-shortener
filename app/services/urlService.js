const redisClient = require('./redisConfig')
const { nanoid } = require('nanoid')

async function shortenUrlService(longUrl) {
  if (!longUrl) {
    throw new Error('Long URL not provided.')
  }

  if (!longUrl.startsWith('https')) {
    throw new Error('Invalid URL.')
  }

  async function generateUniqueShortCode() {
    const code = nanoid(6)

    const exists = await redisClient.exists(`short:${code}`)

    if (exists) {
      generateUniqueShortCode()
    }

    return code
  }

  const shortCode = await generateUniqueShortCode()
  const createdAt = new Date().toISOString()

  await redisClient.hSet(`short:${shortCode}`, {
    longUrl,
    createdAt
  })

  return {
    shortUrl: `http://localhost:5001/${shortCode}`,
    longUrl,
    createdAt
  }
}

async function getLongUrlService(shortCode) {
  if (!shortCode) {
    throw new Error('Short code was not provided')
  }

  const data = await redisClient.hGetAll(`short:${shortCode}`)

  return data
}

module.exports = {
  shortenUrlService,
  getLongUrlService
}
