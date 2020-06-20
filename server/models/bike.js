'use strict'

var mongoose = require('mongoose')

var BikeSchema = mongoose.Schema({
  color: {type: String},
  brand: {type: String},
  price: {type: Number},
  type: {type: String},
  quantity: {type: Number},
  description: {type: String},
  tags: {type: String}

})
var Bike = mongoose.model('Bike', BikeSchema)

module.exports = Bike
