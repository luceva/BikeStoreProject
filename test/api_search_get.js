var expect = require('chai').expect
var server = require('../server/server')
var request = require('supertest')(server)

function post1 (i, idList, done) {
  var result = request.post('/api/Bikes').send({color: 'Blue', brand: 'testBrand', price: (12.34 + i), type: 'testType', quantity: (12 + i), description: 'testDesc', tags: 'testTag'})
  result.expect(201)
  result.end(function (err, res) {
    if (err) return done(err)
    idList.push(res.body._id)
    if (idList.length === 12) {
      done()
    }
  })
}

function deletePost1 (i, idList, done) {
  var result = request.delete('/api/Bikes/' + idList[i])
  result.expect(204)
  result.end(function (err, res) {
    if (err) return done(err)
    if (i === 11) {
      done()
    }
  })
}

describe('Test search', function () {
  var idList = []
  it('Posts many new objects', function (done) {
    for (var i = 0; i < 12; i++) {
      post1(i, idList, done)
    }
  })

  it('Get new objects', function (done) {
    request.get('/api/search?color=Blue')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        } else {
          expect(res.body.length).to.equal(12)
          expect(res.body[0].color).to.equal('Blue')
          expect(res.body[1].brand).to.equal('testBrand')
          expect(res.body[3].price).to.be.a('number')
          expect(res.body[0].price).to.equal(12.34)
          expect(res.body[3].type).to.equal('testType')
          expect(res.body[4].quantity).to.be.a('number')
          expect(res.body[0].quantity).to.equal(12)
          expect(res.body[5].description).to.equal('testDesc')
          expect(res.body[6].tags).to.equal('testTag')

          done()
        }
      })
  })

  it('Delete all of the objects in the Idlist array', function (done) {
    for (var i = 0; i < 12; i++) {
      deletePost1(i, idList, done)
    }
  })
})
