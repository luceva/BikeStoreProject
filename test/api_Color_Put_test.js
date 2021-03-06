var expect = require('chai').expect
var server = require('../server/server')
var request = require('supertest')(server)
// var Note = require('../server/models/bike');

describe('Test Color', function () {
  var newID = null

  // describe('/Test API', function(){
  it('Post a new object', function (done) {
    var result = request
      .post('/api/Bikes').send({color: 'Blue', brand: 'testBrand', price: '12.34', type: 'testType', quantity: '12', description: 'testDesc', tags: 'testTag'})
    result.expect(201)
    result.end(function (err, res) {
      if (err) return done(err)
      newID = res.body._id
      done()
    })
  })

  it('Edits the new object', function (done) {
    var result = request
      .put('/api/Bikes/' + newID).send({color: 'Red', brand: 'testBrand', price: '12.34', type: 'testType', quantity: '12', description: 'testDesc', tags: 'testTag'})
    result.expect(200)
    result.end(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('Check that the new color is present', function (done) {
    var result = request.get('/api/Bikes/' + newID)
    result.set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        } else {
          expect(res.body._id).to.equal(newID)
          expect(res.body.color).to.equal('Red')

          // expect(res.body.colot)
          done()
        }
      })
  })
/*
  it('Check that object can be deleted', function (done) {
    request.delete('/api/Bikes/' + newID)
      .expect(204)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
  */
})
