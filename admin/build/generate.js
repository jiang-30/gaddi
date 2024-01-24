// var bodyParser = require('body-parser')
import bodyParser from 'body-parser'
import { generateRouter } from '../generate/handle'

export const generatePlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    return () => {
      server.middlewares.use('/generate', bodyParser.json())

      server.middlewares.use('/generate', generateRouter)
    }
  },
})
