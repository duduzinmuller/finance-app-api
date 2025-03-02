import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const controller = new CreateUserController()

    const { statusCode, body } = await controller.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const controller = new GetUserByIdController()

    const { statusCode, body } = await controller.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const controller = new UpdateUserController()

    const { statusCode, body } = await controller.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Rodando na porta ${process.env.PORT}`),
)
