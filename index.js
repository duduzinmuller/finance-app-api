import 'dotenv/config.js'
import express from 'express'
import { userRouter, transactionRouter } from './src/routes/index.js'

export const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/transactions', transactionRouter)

app.listen(process.env.PORT, () =>
    console.log(`Rodando na porta ${process.env.PORT}`),
)
