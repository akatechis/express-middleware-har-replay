
const matchtable = require('./matchtable')

const replayer = (config) => {
  const { har, match } = config
  const table = matchtable.create(har.log.entries, match)

  return (req, res, next) => {
    const reqkey = matchtable.keyFromRequest(req)
    const entry = table[reqkey]
    if (entry) {
      const { status, content: { mimeType, text } } = entry
      res.type(mimeType).status(status).send(text)
    }
    next()
  }
}

module.exports = replayer
