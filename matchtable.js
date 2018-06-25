
const url = require('url')

const create = (entries, match) => {
  const table = {}

  entries.forEach(entry => {
    const parsed = new url.URL(entry.request.url)
    if (parsed.host.indexOf(match) > -1) {
      const key = keyFromEntry(entry)
      table[key] = entry.response
    }
  })

  return table
}

const keyFromEntry = entry => {
  const method = entry.request.method
  const path = url.parse(entry.request.url).pathname
  return method + ' ' + path
}

const keyFromRequest = req => {
  return req.method + ' ' + req.path
}

module.exports = {
  create: create,
  keyFromEntry: keyFromEntry,
  keyFromRequest: keyFromRequest
}
