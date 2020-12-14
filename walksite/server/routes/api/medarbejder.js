const express = require('express')
const mongodb = require('mongodb')
const Medarbejder = require('../model/medarbejder')
var config = require('../../config')
const mongoose = require('mongoose')

const router = express.Router()

// Get
router.get('/', async (req, res) => {
  const medarbejder = await loadMedarbejder()
  res.send(await medarbejder.find({}).toArray())
})

// Post
router.post('/', async (req, res) => {
  const medarbejder = await loadMedarbejder()

  await medarbejder
    .insertOne(
      new Medarbejder({
        _id: new mongoose.Types.ObjectId(),
        navn: req.body.navn,
        antal: 0,
        antalAlo: req.body.antalAlo,
        afdeling: req.body.afdeling,
      })
    )
    .then(() => {
      res.status(201).send('oprettet')
    })
    .catch((err) => {
      console.log(err)
    })
})

// Update
// update den udvalgte medarbejderes statistik
router.put('/', async (req, res) => {
  const medarbejder = await loadMedarbejder()
  await medarbejder.findOneAndUpdate(
    { navn: req.body.navn}, 
    { $inc: {antal: 1, antalAlo: 1}})
    .then(() => {
      res.status(200).send('opdateret')
    })
    .catch((err) => {
      console.log(err)
    })
})

// update en medarbejders info 
router.put('/admin', async (req, res) => {
  const medarbejder = await loadMedarbejder()
  await medarbejder.findOneAndUpdate(
    { _id: new mongodb.ObjectID(req.body._id)}, 
    { 
      $set: {
      navn: req.body.navn,
      antal: req.body.antal,
      afdeling: new mongodb.ObjectID(req.body.afdeling)
    } 
    
    })
    .then((e) => {
      res.status(200).send("Medarbejder er opdateret")
    })
    .catch((err) => {
      console.log(err)
    })
})

// Delete
router.delete('/:id', async (req, res) => {
  const medarbejder = await loadMedarbejder()
  await medarbejder.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send('slettet')
})

// Delete medarbejder når en afdeling bliver slettet
router.delete('/', async (req, res) => {
  const medarbejder = await loadMedarbejder()
  await medarbejder.deleteMany({afdeling: new mongodb.ObjectID(req.body.afdeling)}).then(e => {
    res.status(200).send("Alle medarbejder i den slettet afdeling er slettet") 
  })
  
})

async function loadMedarbejder() {
  const client = await mongodb.MongoClient.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return client.db('walksite').collection('medarbejder')
}

module.exports = router
