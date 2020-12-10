const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Afdeling = require('./afdeling')

const medarbejder = new Schema({
  _id: Schema.Types.ObjectId,
  navn: {type: String, required: true},
  antal: Number,
  antalAlo: Number,
  afdeling: { type: mongoose.Schema.Types.ObjectId, ref: "Afdeling", required: true}
})

module.exports = mongoose.model("Medarbejder", medarbejder)