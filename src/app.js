import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { userRouter, transactionRouter } from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/transactions', transactionRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(join(__dirname, '../docs/swagger.json'), 'utf-8'),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app }
