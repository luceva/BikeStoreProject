'use strict'

var Bb = require('backbone')

var HomePageView = Bb.View.extend({

  homeTemplate: require('../templates/homeView.html'),

  // At initialization we bind to the relevant events on the `Notes`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting notes that might be saved in MongoDB

  render: function () {
    this.$el.html(this.homeTemplate())
    return this
  }
})
module.exports = HomePageView
