// bike.js

var Bb = require('backbone')

var Bike = Bb.Model.extend({

  // Default attributes for the todo item.
  defaults: function () {
    return {
      color: '',
      brand: '',
      price: 0.0,
      type: '',
      quantity: 0.0,
      description: '',
      tags: ''
    }
  },

  idAttribute: '_id' // MongoDB uses '_id'
})

// Bike.prototype.sync = function () { return null }
// Bike.prototype.fetch = function () { return null }
// Bike.prototype.save = function () { return null }

module.exports = Bike
