const express = require('express')
const router = express.Router()
const { shortenUrlService, getLongUrlService } = require('../services/urlService')

router.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body

  try {
    const shortCodeData = await shortenUrlService(longUrl)

    res.status(200).json(shortCodeData)
  } catch (err) {
    // kind of a catch all and potentially misleading status but i don't really want to be more specific rn
    res.status(400).json({ message: err.message })
  }
})

router.get('/:shortCode', async (req, res) => {
  try {
    const shortCode = req.params.shortCode

    const { longUrl } = await getLongUrlService(shortCode)

    if (longUrl) {
      res.redirect(longUrl)
    }
    res.status(404).json({ message: 'URL not found.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router

