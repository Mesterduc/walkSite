const express = require('express')
// const mongodb = require('mongodb')
const Login = require('../model/login')
// var config = require('../../config')
// const mongoose = require('mongoose')
const Bcrypt = require('bcryptjs')

const router = express.Router()

// Get
router.route('/').get((req, res) => {
  Login.find((error, data) => {
   if (error) {
     return next(error)
   } else {
     res.json(data)
   }
 })
})


router.route('/').post((req, res, next) => {
  Login.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
});



// router.get('/', async (req, res) => {
//   const login = await loadLogin()
//   await login
//     .findOne({ brugernavn: req.body.brugernavn })
//     .then((e) => {
//       if (!e.brugernavn) {
//         return res.status(400).send('Brugernavn findes ikke')
//       }
//       if (!Bcrypt.compareSync(req.body.password, e.password)) {
//         return res.status(400).send('password er forkert')
//       }
//       res.send('Brugernavn og password er korrect')
//     })
//     .catch((err) => {
//       res.status(500).send(err + "asd")
//     })
// })
// get
router.route('/create-student').post((req, res, next) => {
  StudentModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
});



// Post
// router.post('/', async (req, res) => {
//   const login = await loadLogin()
//   kode = Bcrypt.hashSync(req.body.password, 10)
//   var hej = new Login({
//     _id: new mongoose.Types.ObjectId(),
//         brugernavn: req.body.brugernavn,
//         password: kode,
//         medarbejder: new mongoose.Types.ObjectId(req.body.medarbejder),
//   })
//   // hej.save(function (err, post) {
//   //   if (err) { console.log("hej") }
//   //   res.send(console.log("post"))
//   // })
//   login.create()

//   // await login
//   //   .insertOne(
//   //     new Login({
//   //       _id: new mongoose.Types.ObjectId(),
//   //       // brugernavn: req.body.brugernavn,
//   //       hans: "jksad",
//   //       password: kode,
//   //       medarbejder: new mongoose.Types.ObjectId(req.body.medarbejder),
//   //     })
//   //   )
//   //   .then((e) => {
//   //     res.status(201).send('Login er oprettet' + e)
//   //   })
//   //   .catch((err) => {
//   //     res.send('virker ikke' + err)
//   //   })
// })

// Delete
router.delete('/:id', async (req, res) => {
  const login = await loadLogin()
  await login.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send('afdeling blev slettet')
})

// async function loadLogin() {
//   const client = await mongodb.MongoClient.connect(config.database, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   return client.db('walksite').collection('login')
// }

module.exports = router
