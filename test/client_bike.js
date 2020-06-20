
var expect = require('chai').expect
var Bike = require('../client/models/bike.js')

describe('Client side Bike object', function () {
  it('Default values', function (done) {
    var x = new Bike()
    expect(x).to.be.ok
    expect(x.get('color')).to.be.a.string
    expect(x.get('brand')).to.be.a.string
    expect(x.get('price')).to.be.a('number')
    expect(x.get('type')).to.be.a.string
    expect(x.get('quantity')).to.be.a('number')
    expect(x.get('description')).to.be.a.string
    expect(x.get('tags')).to.be.a.string
    done()
  })

  it('constructor', function (done) {
    var myColor = 'blue'
    var myBrand = 'pot'
    var myPrice = 67
    var myType = 'aefi'
    var myQuantity = 12
    var myDescription = 'asd'
    var myTags = 'eqe'
    var x = new Bike({color: myColor, brand: myBrand, price: myPrice, type: myType, quantity: myQuantity, description: myDescription, tags: myTags})
    expect(x).to.be.ok
    expect(x.get('color')).to.equal(myColor)
    expect(x.get('brand')).to.equal(myBrand)
    expect(x.get('price')).to.equal(myPrice)
    expect(x.get('type')).to.equal(myType)
    expect(x.get('quantity')).to.equal(myQuantity)
    expect(x.get('description')).to.equal(myDescription)
    expect(x.get('tags')).to.equal(myTags)
    done()
  })
})
