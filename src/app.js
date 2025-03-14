import express from 'express'

import { userRouter, transactionRouter } from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

export const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/transactions', transactionRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(
        path.join(import.meta.dirname, '../docs/swagger.json'),
        'utf-8',
    ),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
