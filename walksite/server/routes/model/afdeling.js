const mongoose = require('mongoose')
const Schema = mongoose.Schema

const afdelingSchema = new Schema({
  navn: {type: String, required: true} ,
  medarbejder: [{ type: Schema.Types.ObjectId, ref: "Medarbejder"}]
})

const Afdeling = module.exports = mongoose.model("Afdeling", afdelingSchema)