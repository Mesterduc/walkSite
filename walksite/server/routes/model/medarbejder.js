const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medarbejder = new Schema({
  navn: {type: String, required: true},
  antal: Number,
  antalAlo: Number,
  sidst: {type: Boolean, default: false},
  afdeling: { type: mongoose.Schema.Types.ObjectId, ref: "Afdeling"}
})

module.exports = mongoose.model("Medarbejder", medarbejder)