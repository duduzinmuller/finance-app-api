import { CreateUserController } from './create-user.js'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }
    it('should return 201 when creating a user successfully', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Dudu',
                last_name: 'Muller',
                email: 'dudu@fm.com',
                password: '232e32',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act

        const httpRequest = {
            body: {
                last_name: 'Muller',
                email: 'dudu@fm.com',
                password: '3123213',
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Dudu',
                email: 'dudu@fm.com',
                password: '3123213',
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Dudu',
                last_name: 'Ola',
                password: '3123213',
            },
        }
        const result = await createUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(400)
    })
})
