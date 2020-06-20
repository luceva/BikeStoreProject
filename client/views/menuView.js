'use strict'

var Bb = require('backbone')
var BikeListingView = require('./bikeListingView.js')
var FormView = require('../views/formView.js')
var HomeView = require('../views/homeView.js')
var SearchView = require('../views/searchView.js')
var EditView = require('../views/editView.js')
var MainView = require('./mainView.js')

var MenuView = Bb.View.extend({
  el: $('#bikesapp'),

  events: {
    'click #homeButton': 'goHomeRoute',
    'click #viewButton': 'viewBikesRoute',
    'click #plusButton': 'addBikeRoute',
    'click #searchButton': 'searchBikeRoute'
  },

  initialize: function (options) {
    this.activeView = null
    this.collection = options.collection
    this.router = options.router
    this.mainView = new MainView({ el: $('#mainArea') })
    this.mainView.render()
    this.goHome()
  },

  swapView: function (aView) {
    if (this.activeView) {
      this.activeView.remove()
    }
    this.activeView = aView
    this.mainView.render()
    aView.setElement('#subViewTarget')
    aView.render()
  },

  goHomeRoute: function () {
    this.router.navigate('/', { trigger: true })
  },

  viewBikesRoute: function () {
    this.router.navigate('/listBikes', { trigger: true })
  },

  addBikeRoute: function () {
    this.router.navigate('/addBike', { trigger: true })
  },

  searchBikeRoute: function () {
    this.router.navigate('/searchBike', { trigger: true })
  },

  goHome: function () {
    this.swapView(new HomeView())
  },

  viewBikes: function () {
    var blView = new BikeListingView({ collection: this.collection, router: this.router })
    this.collection.on('sync', function () {
      this.swapView(blView)
    }, this)
    this.collection.fetch()
  },

  addBike: function () {
    this.swapView(new FormView({ collection: this.collection }))
  },

  searchBike: function () {
    this.swapView(new SearchView({ router: this.router }))
  },

  editBike: function (id) {
    var theModel = this.collection.get(id)
    if (!theModel) { // ack, the collection hasn't been fetched. Do it!
      this.collection.on('sync', function () {
        theModel = this.collection.get(id)
        if (!theModel) {
          alert("Ack! I can't find that model") // maybe it's gone?
        }
        this.swapView(new EditView({ model: theModel, router: this.router }))
      }, this)
      this.collection.fetch()
    }
    this.swapView(new EditView({ model: theModel, router: this.router }))
  }
})
module.exports = MenuView
