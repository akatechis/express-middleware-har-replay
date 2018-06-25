const { describe, it, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const fixture = require('./fixture')
const har = require('./basic.json')

describe('Basic Test', () => {
  let app = null
  let request = null

  beforeEach(() => {
    const match = 'example.com'
    app = fixture.makeApp({ har, match })
    request = supertest(app)
  })

  afterEach(() => {
    app = null
    request = null
  })

  it('replays matched requests', () => {
    return request.get('/api/foo/bar')
      .expect(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.eql({ foo: 'bar' })
        expect(res.headers['x-some-custom-header']).to.equal('custom-token-foo-bar')
      })
  })

  it('ignores requests that did not match', () => {
    return request.get('/api/hello/world').expect(404)
  })
})
