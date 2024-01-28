import mongoose from 'mongoose'

import config from '../config/enviroment'
import { logger } from './logger'

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('connect to database')
  })
  .catch((err) => {
    logger.info('could not connect to database')
    logger.error(err)
    process.exit(1)
  })
