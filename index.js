
const matchtable = require('./matchtable')

const writeEntry = (res, entry) => {
  const { headers, status, content: { text } } = entry

  // write headers
  headers.forEach(({ name, value }) => {
    res.set(name, value)
  })

  res.status(status).send(text)
}

const replayer = (config) => {
  const { har, match } = config

  // when the middleware is created, we create a table of entries we want
  // to replay
  const table = matchtable.create(har.log.entries, match)

  return (req, res, next) => {
    // create a key for this request
    const reqkey = matchtable.keyFromRequest(req)
    const entry = table[reqkey]

    // if an entry exists in the table, we write the response
    if (entry) {
      writeEntry(res, entry)
    }

    // signal we're done
    return next()
  }
}

module.exports = replayer
