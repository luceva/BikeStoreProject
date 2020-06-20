var expect = require('chai').expect
var sinon = require('sinon')
var BikeCollection = require('../client/models/bikeCollection.js')

describe('Client side Bike Collection Object', function () {
  it('constructor check', function (done) {
    var x = new BikeCollection()
    expect(x).to.be.ok
    expect(x.url).to.equal('/api/Bikes/')
    done()
  })

  it('should be able to fetch', function (done) {
    var fakeserver = sinon.fakeServer.create()
    fakeserver.respondWith('/api/Bikes/', [
      200,
      {'Content-type': 'application/json'},
      JSON.stringify([{aBike: 'hello'}])
    ])
    var coll = new BikeCollection()

    coll.fetch({
      success: function (collection, response, options) { done() },
      error: function (collection, response, options) { done(response) }
    })
    fakeserver.respond()

    expect(coll.length).to.equal(1)
    fakeserver.restore()
  })
})
