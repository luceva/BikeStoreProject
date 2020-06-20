'use strict'

var Bb = require('backbone')
var AppView = Bb.View.extend({

  statsTemplate: require('../templates/appStatsView.html'),

  events: {
    'keypress #new-bikeDescription': 'createOnEnter',
    /* 'click #delete-checked': 'deleteChecked' */
    'click #enterButton': 'onAdd'
  },

  // At initialization we bind to the relevant events on the `Notes`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting notes that might be saved in MongoDB
  render: function () {
    this.$el.html(this.statsTemplate())
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

  initialize: function (options) {
    this.Bikes = options.collection // the collection is a collection of notes
    this.listenTo(this.Bikes, 'add', this.log)
    this.footer = this.$('footer')
    this.bikeList = this.$('#bike-list')
  },

  log: function () {
    console.log('One bike added, currently:' + this.collection.length + ' bikes.')
  },
  enterBike: function () {
    this.Bikes.create({
      brand: this.newBrandField.val(),
      color: this.newColorField.val(),
      price: this.newPriceField.val(),
      type: this.newTypeField.val(),
      quantity: this.newQuantityField.val(),
      tags: this.newTagsField.val(),
      description: this.newDescriptionField.val()
    })
    this.newBrandField.val('')
    this.newColorField.val('')
    this.newPriceField.val('')
    this.newTypeField.val('')
    this.newQuantityField.val('')
    this.newTagsField.val('')
    this.newDescriptionField.val('')
    this.newBrandField.focus()
  },

  onAdd: function () {
    if (this.checkFields()) {
      this.enterBike()
    }
  },

  checkFields: function () {
    if (this.newBrandField.val().length === 0) {
      alert('Brand field is empty')
      return false
    }
    if (this.newColorField.val().length === 0) {
      alert('Color field is empty')
      return false
    }
    if (isNaN(this.newPriceField.val()) || this.newPriceField.val().length === 0) {
      alert('Price must be a number')
      return false
    }
    if (this.newTypeField.val().length === 0) {
      alert('Type field is empty')
      return false
    }
    if (isNaN(this.newQuantityField.val()) || this.newQuantityField.val().length === 0) {
      alert('Quantity must be a number')
      return false
    }
    if (this.newTagsField.val().length === 0) {
      alert('Tags field is empty')
      return false
    }
    if (this.newDescriptionField.val().length === 0) {
      alert('Description field is empty')
      return false
    }
    return true
  },

  createOnEnter: function (e) {
    if (e.keyCode !== 13) return

    this.onAdd()
  }

})

module.exports = AppView
