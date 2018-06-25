# express-middleware-har-replay
Express middleware for replaying a HAR archive of HTTP requests

## Description
This middleware will let you create a server that replays requests captured in
a HAR file.

## Usage

`npm install express-middleware-har-replay`

```
const harreplayer = require('express-middleware-har-replay')
const app = express()
app.use(harreplayer({
  match: 'somehost.com',
  har: require('./my-har.json')
})
app.listen(8080)
```

## Options

- `har` A plain JS object representing the contents of the HAR file.
- `match` The host to match.

The match option will tell the middleware which requests to replay. For 
example, if your HAR file has captured a `GET http://example.com/foo/bar/baz`,
we can replay this request by providing `'example.com'` as our `match` option,
and later, dispatching a GET request to `http://localhost:8080/foo/bar/baz`.

## Missing/TODO

- Publish ES5 code so it works on older versions of Node.
- More control over which requests to replay and how.
- Handle multiple requests to the same endpoint with different responses.
