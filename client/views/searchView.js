'use strict'

var Bb = require('backbone')
var BikeCollection = require('../models/bikeCollection.js')
var BikeListingView = require('../views/bikeListingView.js')
var SearchView = Bb.View.extend({

  el: $('#mainArea'),
  events: {
    'keypress #new-search': 'searchOnEnter',
    'click #submitSearchButton': 'findBike'
  },

  searchTemplate: require('../templates/searchView.html'),

  // At initialization we bind to the relevant events on the `Notes`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting notes that might be saved in MongoDB
  initialize: function (options) {
    this.router = options.router
    this.collection = new BikeCollection()
    this.collection.url = '/api/search'
    this.listingView = new BikeListingView({collection: this.collection, router: this.router})
    this.collection.on('sync', function () {
      this.listingView.render()
    }, this)
  },

  remove: function () {
    if (this.listingView) {
      this.listingView.remove()
      Bb.View.prototype.remove.apply(this)
    }
  },

  render: function () {
    this.$el.html(this.searchTemplate())
    this.$('#new-search').focus()
    this.listingView.setElement('#bike-list')
    return this
  },

  findBike: function () {
    this.collection.fetch({ data: { color: this.$('#new-search').val() } })
  },

  searchOnEnter: function (e) {
    if (e.keyCode !== 13) return

    this.findBike()
  }

})
module.exports = SearchView
