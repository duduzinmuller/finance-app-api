import express from 'express'

import { userRouter, transactionRouter } from './routes/index.js'

export const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/transactions', transactionRouter)
