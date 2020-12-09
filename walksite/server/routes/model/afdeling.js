const mongoose = require('mongoose')
const Schema = mongoose.Schema

const afdeling = new Schema({
  _id: Schema.Types.ObjectId,
  navn: {type: String, required: true} ,
  medarbejder: { type: Schema.Types.ObjectId, ref: "Medarbejder"}
})

module.exports = mongoose.model("Afdeling", afdeling)