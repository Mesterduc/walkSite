const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medarbejder = new Schema({
  _id: Schema.Types.ObjectId,
  navn: {String, required: true},
  antal: Number,
  antalAlo: Number,
  afdeling: { type: Schema.Types.ObjectId, ref: "Afdeling"}
})

module.exports = mongoose.model("Medarbejder", medarbejder)