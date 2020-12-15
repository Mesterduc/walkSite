const express = require('express')
const Afdeling = require('../model/afdeling')
const Afdelingrouter = express.Router()

// Get
Afdelingrouter.get('/', async (req, res) => {
  await Afdeling.find({}).populate('medarbejder')
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

// Post
Afdelingrouter.route('/').post((req, res, next) => {
  Afdeling.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Delete
Afdelingrouter.delete('/:id', async (req, res) => {
  Afdeling.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = Afdelingrouter
