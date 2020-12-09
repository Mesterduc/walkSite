const express = require('express')
const mongodb = require('mongodb')
const Afdeling = require('../model/afdeling')
var config = require('../../config')
const mongoose = require('mongoose')

const router = express.Router()

// Get
router.get('/', async (req, res) => {
  const afdeling = await loadAfdeling()
  res.send(await afdeling.find({}).toArray())
})

// Post
router.post('/', async (req, res) => {
  const afdeling = await loadAfdeling()
  await afdeling.insertOne(
  new Afdeling({
    _id: new mongoose.Types.ObjectId(),
    navn: req.body.navn,
    medarbejder: {},
  }))
  res.status(201).send("virker")
})

// Delete
router.delete('/:id', async (req, res) => {
  const afdeling = await loadAfdeling()
  await afdeling.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(200).send()
})



async function loadAfdeling() {
  const client = await mongodb.MongoClient.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return client.db('walksite').collection('afdeling')
}

module.exports = router
