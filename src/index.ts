import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import './utils/connectDB'
import deserializeToken from './middleware/deserializedToken'

const app: Application = express()
const port: number = 4000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors acces handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Acces-Control-Allow-Origin', '*')
  res.setHeader('Acces-Control-Allow-Methods', '*')
  res.setHeader('Acces-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

routes(app)

app.listen(port, () => {
  logger.info(`listen on port ${port}`)
})
