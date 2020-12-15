const express = require('express')
const Login = require('../model/login')
const Bcrypt = require('bcryptjs')

const login = express.Router()

login.route('/').post((req, res, next) => {
  req.body.password = Bcrypt.hashSync(req.body.password, 10)
  Login.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

login.route('/test').post((req, res, next) => {
  Login.findOne({ brugernavn: req.body.brugernavn }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      if (!data.brugernavn) {
        return res.status(400).send('Brugernavn findes ikke')
      }
      if (!Bcrypt.compareSync(req.body.password, data.password)) {
        return res.status(400).send('password er forkert')
      }
      // res.send('Brugernavn og password er korrect')
      res.send(true)
    }
  })
})

// Delete
// login.delete('/:id', async (req, res) => {
//   await login.deleteOne({ _id: req.params.id })
//   res.status(200).send('Login blev slettet')
// })

module.exports = login
