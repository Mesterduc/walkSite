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
  const afdeling = await loadMedarbejder()
  // await medarbejder.find({}).toArray().then((e) => {
  //   let antal = 0
    
  //   e.forEach(x => {
  //     x.antalAlo += antal
  //   });
  //   let tal = antal / e.length
  // })
  await afdeling
    .insertOne(
       new Medarbejder({
        _id: new mongoose.Types.ObjectId(),
        navn: req.body.navn,
        antal: 0,
        antalAlo: 4,
        afdeling: req.body.afdeling,
      })
    )
    .then(() => {
      res.status(201).send("virker")
    })
    .catch((err) => {
      console.log(err)
    })
})

// Delete
router.delete('/:id', async (req, res) => {
  const afdeling = await loadMedarbejder()
  await afdeling.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send('slettet')
})

async function loadMedarbejder() {
  const client = await mongodb.MongoClient.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return client.db('walksite').collection('medarbejder')
}

module.exports = router
