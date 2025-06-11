const express = require('express')
const path = require('path')
const routes = require('./app/routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5001
const redisClient = require('./app/services/redisConfig')


app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/api/health', (req, res) => {
  console.log('*** health endpoint hit')
  res.send({ message: `Running on port ${port}` })
})

async function startServer() {
  redisClient.connect()
  app.listen(port, () => console.log(`Listening on port ${port}`))
    .on('error', (err) => {
      console.error(`Server failed to start: ${err}`)
    })
}

startServer()

