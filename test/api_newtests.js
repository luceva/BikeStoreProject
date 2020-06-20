var expect = require('chai').expect
var server = require('../server/server')
var request = require('supertest')(server)

describe('Test API', function () {
  var newID = null

  it('Post a new object', function (done) {
    var result = request
      .post('/api/Bikes').send({color: 'testColor', brand: 'testBrand', price: 12.34, type: 'testType', quantity: 12, description: 'testDesc', tags: 'testTag'})
    result.expect(201)
    result.end(function (err, res) {
      if (err) return done(err)
      newID = res.body._id
      console.log('got new id:', newID)
      done()
    })
  })

  it('Check if the object has a price', function (done) {
    request.get('/api/Bikes/' + newID)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        } else {
          expect(res.body._id).to.equal(newID)
          expect(res.body.price).to.be.a('number')
          expect(res.body.price).to.equal(12.34)
          done()
        }
      })
  })
})
