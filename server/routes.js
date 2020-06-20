'use strict'

var express = require('express')
var router = express.Router()

var Bike = require('./models/bike.js')

var bikeHandler = { // CRUD method collection for Notes

  getAll: function (req, res, next) {
    Bike.find(function (err, notes) {
      if (err) return res.status(400).json(err)

      res.status(200).json(notes)
    })
  },

  createOne: function (req, res, next) {
    Bike.create(req.body, function (err, notes) {
      if (err) return res.status(400).json(err)

      res.status(201).json(notes)
    })
  },

  getOne: function (req, res, next) {
    Bike.findOne({_id: req.params.id}).exec(function (err, note) {
      if (err) return res.status(400).json(err)
      if (!note) return res.status(404).json()

      res.status(200).json(note)
    })
  },

  updateOne: function (req, res, next) {
    Bike.findOneAndUpdate({_id: req.params.id},
      req.body, function (err, note) {
        if (err) return res.status(400).json(err)
        if (!note) return res.status(404).json()
        res.status(200).json(note)
      })
  },

  deleteOne: function (req, res, next) {
    Bike.findOneAndRemove({_id: req.params.id}, function (err) {
      if (err) return res.status(400).json(err)
      res.status(204).json()
    })
  },

  searchAll: function (req, res, next) {
    Bike.find(req.query).exec(function (err, note) {
      if (err) return res.status(400).json(err)
      if (!note) return res.status(404).json()

      res.status(200).json(note)
    })
  }
}

router.get('/Bikes', bikeHandler.getAll)
router.get('/Bikes/:id', bikeHandler.getOne)
router.post('/Bikes', bikeHandler.createOne)
router.put('/Bikes/:id', bikeHandler.updateOne)
router.delete('/Bikes/:id', bikeHandler.deleteOne)
router.delete('/search/:id', bikeHandler.deleteOne)
router.get('/search', bikeHandler.searchAll)

module.exports = router
