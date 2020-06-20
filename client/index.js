/* eslint no-unused-vars: 0 */
'use strict'

require('./setup.js') // pull in setup code, jquery etc.
var Bb = require('backbone')

var MenuView = require('./views/menuView.js')

var BikeCollection = require('./models/bikeCollection.js')

var bikes = new BikeCollection() // build a collection of bikes

var AppRouter = Bb.Router.extend({
  routes: {
    '': 'home',
    'listBikes': 'list',
    'editBike/:bikeID': 'edit',
    'addBike': 'add',
    'searchBike': 'search'
  },

  home: function () {
    menu.goHome()
  },

  list: function () {
    menu.viewBikes()
  },

  add: function () {
    menu.addBike()
  },

  edit: function (theID) {
    menu.editBike(theID)
  },

  search: function () {
    menu.searchBike()
  }

})

var menu = new MenuView({collection: bikes, router: new AppRouter()}) // build a main page view

Bb.history.start()

console.log("We're started!")
