const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()

app.use(express.json())
app.use(cors())
var config = require('./config')

const afdeling = require('./routes/api/afdeling')
app.use('/afdeling', afdeling)

const medarbejder = require('./routes/api/medarbejder')
app.use('/medarbejder', medarbejder)

// mongoose.connect(config.database, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log(`Database connected successfully ${config.port}`)
// }).catch(err => {
//   console.log(`Unable to connect with the database ${err}`)
// });

app.listen(config.port, () => console.log(`Server started on port ${config.port}`))
