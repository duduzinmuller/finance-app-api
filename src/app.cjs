const express = require('express')
const { userRouter, transactionRouter } = require('./routes/index.js')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/transactions', transactionRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf-8'),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = { app }
