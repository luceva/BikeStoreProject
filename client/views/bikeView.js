'use strict'

var Bb = require('backbone')
var _ = require('underscore')

var BikeView = Bb.View.extend({

  // will render into a list
  tagName: 'li',

  // Cache the template function for a single item.
  template: require('../templates/bikeView.html'),

  events: {
    'click input.toggle': 'toggleChecked',
    'click #editButton': 'editBike'
  },

  editBike: function (options) {
    this.router.navigate('/editBike/' + this.model.id, {trigger: true})
  },

  setCheck: function (checked) {
    this.checked = checked
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function (options) {
    this.model = options.model
    this.router = options.router
    this.model.view = this
    this.listenTo(this.model, 'change', this.render)
    this.listenTo(this.model, 'destroy', this.remove)
  },

  // Re-render the titles of the todo item.
  render: function () {
    var json = this.model.toJSON()
    this.$el.html(this.template(_.extend(json, {checked: this.checked})))
    return this
  },
  // Toggle the `'checked'` state of the model.

  // Remove the item, destroy the model.
  clear: function () {
    this.model.destroy()
  },

  toggleChecked: function () {
    this.checked = !this.checked
  }
})

module.exports = BikeView
