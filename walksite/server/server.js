const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./config')

const app = express()

app.use(express.json())
app.use(cors())

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)


const afdeling = require('./routes/api/afdeling')
app.use('/afdeling', afdeling)

const medarbejder = require('./routes/api/medarbejder')
app.use('/medarbejder', medarbejder)

const login = require('./routes/api/login')
app.use('/login', login)

app.listen(config.port, () => console.log(`Server started on port ${config.port}`))


