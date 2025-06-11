const express = require('express')
const routes = require('./app/routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5001
const redisClient = require('./app/services/redisConfig')


app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/api/health', (req, res) => {
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

