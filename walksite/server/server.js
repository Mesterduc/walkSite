const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./config')

const app = express()

app.use(express.json())
app.use(cors())


const afdeling = require('./routes/api/afdeling')
app.use('/afdeling', afdeling)

const medarbejder = require('./routes/api/medarbejder')
app.use('/medarbejder', medarbejder)

app.listen(config.port, () => console.log(`Server started on port ${config.port}`))
