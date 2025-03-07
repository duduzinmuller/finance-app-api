import { GetUserByIdController } from './get-user-by-id.js'
import { faker } from '@faker-js/faker'

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            }
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const sut = new GetUserByIdController(getUserByIdUseCase)

        return { sut, getUserByIdUseCase }
    }

    it('should return 200 if a user is found', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        })

        //assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if a id is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            params: { userId: 'invalid-id' },
        })

        //assert
        expect(result.statusCode).toBe(400)
    })
})
