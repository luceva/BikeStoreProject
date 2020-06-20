global._ = require('underscore') // underscore templates need access

var expect = require('chai').expect
var Bike = require('../client/models/bike.js')
var BikeView = require('../client/views/bikeView.js')

describe('Bike View tests', function () {
  it('should exist', function (done) {
    expect(BikeView).to.be.ok
    done()
  })

  it('should render color and brand', function (done) {
    var bike = new Bike({color: 'red', brand: 'giant'})
    var bv = new BikeView({model: bike})
    var el = bv.render().$el

    expect(el.find('label').text()).to.equal('giant : red : 0 : 0')

    done()
  })
})
