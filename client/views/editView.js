'use strict'

var Bb = require('backbone')
var AppView = Bb.View.extend({

  editTemplate: require('../templates/editFormView.html'),
  statsTemplate: require('../templates/appStatsView.html'),
  events: {
    'keypress #new-bikeDescription': 'createOnEnter',
    'click #enterButton': 'enterBike',
    'click #cancelButton': 'cancelBike'
  },

  // At initialization we bind to the relevant events on the `Notes`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting notes that might be saved in MongoDB
  render: function () {
    var json = this.model.toJSON()
    this.$el.html(this.editTemplate(json))
    this.newBrandField = this.$('#new-bikeBrand')
    this.newColorField = this.$('#new-bikeColor')
    this.newPriceField = this.$('#new-bikePrice')
    this.newTypeField = this.$('#new-bikeType')
    this.newQuantityField = this.$('#new-bikeQuantity')
    this.newTagsField = this.$('#new-bikeTags')
    this.newDescriptionField = this.$('#new-bikeDescription')
    this.newBrandField.focus()
    return this
  },

  cancelBike: function () {
    this.router.navigate('/listBikes', {trigger: true})
  },

  initialize: function (options) {
    this.Bikes = options.collection // the collection is a collection of notes
    this.router = options.router
  },

  enterBike: function () {
    this.model.set({
      brand: this.newBrandField.val(),
      color: this.newColorField.val(),
      price: this.newPriceField.val(),
      type: this.newTypeField.val(),
      quantity: this.newQuantityField.val(),
      tags: this.newTagsField.val(),
      description: this.newDescriptionField.val()
    })
    this.model.save()
    this.router.navigate('/listBikes', {trigger: true})
  },

  checkFields: function () {
    if (typeof this.newBrandField !== 'string') return false
    if (typeof this.newColorField !== 'string') return false
    if (typeof this.newPriceField !== 'number') return false
    if (typeof this.newTypeField !== 'string') return false
    if (typeof this.newQuantityField !== 'number') return false
    if (typeof this.newTagsField !== 'string') return false
    if (typeof this.newDescriptionField !== 'string') return false
    else return true
  },

  createOnEnter: function (e) {
    if (e.keyCode !== 13) return

    this.enterBike()
  }
})

module.exports = AppView
