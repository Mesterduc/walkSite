const express = require('express')
const Medarbejder = require('../model/medarbejder')
const Afdeling = require('../model/afdeling')
const MedarbejderRouter = express.Router()

// Get
MedarbejderRouter.get('/', async (req, res) => {
  await Medarbejder.find({}).populate('afdeling')
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log(err)
  })
})

// Post
MedarbejderRouter.post('/', async (req, res) => {
  await Medarbejder.create(req.body, (err, data) => {
    if (err) {
      return console.log(err)
    } else {
      Afdeling.findByIdAndUpdate(data.afdeling._id, { $push: { medarbejder: { _id: data._id } } })
        .then((e) => {
          res.send(e)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
})

// Update
// update den udvalgte medarbejderes statistik
MedarbejderRouter.put('/', async (req, res) => {
  await Medarbejder.updateMany({sidst: false})
  await Medarbejder.findOneAndUpdate({ navn: req.body.navn }, { $inc: { antal: 1, antalAlo: 1 }, $set: {sidst: true} })
    .then(() => {
      res.status(200).send('opdateret')
    })
    .catch((err) => {
      console.log(err)
    })
})

// update en medarbejders info
MedarbejderRouter.put('/admin', async (req, res) => {
  await Medarbejder.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        navn: req.body.navn,
        antal: req.body.antal,
        afdeling: req.body.afdeling,
      },
    }
  )
    .then((e) => {
      res.status(200).send('Medarbejder er opdateret')
    })
    .catch((err) => {
      console.log(err)
    })
})

// Delete
MedarbejderRouter.delete('/:id', async (req, res) => {
  await Medarbejder.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

// Delete medarbejder når en afdeling bliver slettet
MedarbejderRouter.delete('/', async (req, res) => {
  await Medarbejder.deleteMany({ afdeling: req.body.afdeling }).then((e) => {
    res.status(200).send('Alle medarbejder i den slettet afdeling er slettet')
  })
})

module.exports = MedarbejderRouter
