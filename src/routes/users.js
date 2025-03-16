import { Router } from 'express'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeLoginUserController,
    makeUpdateUserController,
} from '../factories/controllers/user.js'
import { auth } from '../middlewares/auth.js'

export const userRouter = Router()

userRouter.get('/', auth, async (request, response) => {
    const getUserByIdController = makeGetUserByIdController()

    console.log('Usuárion autenticado:', request.userId)

    const { statusCode, body } = await getUserByIdController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

userRouter.get('/balance', auth, async (request, response) => {
    const getUserBalanceController = makeGetUserBalanceController()

    const { statusCode, body } = await getUserBalanceController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

userRouter.post('/', async (request, response) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

userRouter.patch('/', auth, async (request, response) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

userRouter.delete('/', auth, async (request, response) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

userRouter.post('/login', async (request, response) => {
    const loginUserController = makeLoginUserController()

    const { statusCode, body } = await loginUserController.execute(request)

    response.status(statusCode).send(body)
})
