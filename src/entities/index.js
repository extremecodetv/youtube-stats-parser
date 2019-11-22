const mongoose = require('mongoose')
const config = require('@config')

mongoose.Promise = global.Promise

const options = {
  auto_reconnect: true,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(config.mongoUri, options)

require('./Stats')
require('./Video')
