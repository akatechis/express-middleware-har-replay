const express = require('express')
const replayer = require('../index')

const makeApp = (config) => {
  const app = express()
  app.use(replayer(config))

  return app
}

module.exports = {
  makeApp: makeApp
}
