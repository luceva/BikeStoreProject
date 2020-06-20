'use strict'

var Bb = require('backbone')
var Bike = require('./bike.js')

var BikeCollection = Bb.Collection.extend({

  // Reference to this collection's model.
  model: Bike,
  url: '/api/Bikes/'
})

module.exports = BikeCollection
