const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
  brugernavn: {type: String, required: true} ,
  password: {type: String, required: true} ,
  // medarbejder: { type: Schema.Types.ObjectId, ref: "Medarbejder"}
})

const login = (module.exports = mongoose.model("login", loginSchema));