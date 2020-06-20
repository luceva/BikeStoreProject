var Bb = require('backbone')

var MainView = Bb.View.extend({
  template: require('../templates/mainView.html'),
  render: function () {
    this.$el.html(this.template())
  }
})

module.exports = MainView
