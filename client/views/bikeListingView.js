'use strict'

var Bb = require('backbone')
var BikeView = require('./bikeView.js')
var BikeListingView = Bb.View.extend({
  el: $('#mainArea'),
  events: {
    'click #deleteButton': 'deleteChecked'
  },

  template: require('../templates/bikeList.html'),

  initialize: function (options) {
    this.collection = options.collection
    this.router = options.router
  },

  render: function () {
    this.$el.html(this.template())
    this.afterRender()  // just run the 'afterRender' after the render.
    return this
  },

  afterRender: function () {
    this.bikeDisplay = this.$('#bike-list')
    this.collection.each(function (bike) {
      var tempView =  new BikeView({
        model: bike,
        router: this.router
      })
      this.bikeDisplay.append(tempView.render().el)
    }, this)
  },

  deleteChecked: function () {
    _.invoke(this.collection.filter(function (bike) {
      return (bike.view && bike.view.checked)
    }), 'destroy')
  }
})
module.exports = BikeListingView
