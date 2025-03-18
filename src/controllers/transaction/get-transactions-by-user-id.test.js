import { UserNotFoundError } from '../../errors/user.js'
import { transaction } from '../../tests/index.js'
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js'
import { faker } from '@faker-js/faker'

describe('Get Transaction By User ID Controller', () => {
    const from = '2025-03-17'
    const to = '2025-03-18'

    class getUserByIdUseCaseStub {
        async execute() {
            return transaction
        }
    }
    const makeSut = () => {
        const getTransactionsByUserIdUseCase = new getUserByIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        )

        return { sut, getTransactionsByUserIdUseCase }
    }

    it('should return 200 when finding transaction by user id successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: { userId: faker.string.uuid(), from, to },
        })

        //assert
        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when missing userId params', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: { userId: undefined, from, to },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when userId params is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: { userId: 'invalid_user_id', from, to },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 404 when GetUserByIdUseCase throws UserNotFoundError', async () => {
        //arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut()

        import.meta.jest
            .spyOn(getTransactionsByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        //act
        const response = await sut.execute({
            query: { userId: faker.string.uuid(), from, to },
        })

        //assert
        expect(response.statusCode).toBe(404)
    })

    it('should return 500 when GetUserByIdUseCase throws generic error', async () => {
        //arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut()

        import.meta.jest
            .spyOn(getTransactionsByUserIdUseCase, 'execute')
            .mockImplementationOnce(new Error())

        //act
        const response = await sut.execute({
            query: { userId: faker.string.uuid(), from, to },
        })

        //assert
        expect(response.statusCode).toBe(500)
    })

    it('should call GetUserByIdUseCase with correct params', async () => {
        //arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        )
        const userId = faker.string.uuid()

        //act
        await sut.execute({
            query: { userId: userId, from, to },
        })

        //assert
        expect(executeSpy).toHaveBeenCalledWith(userId, from, to)
    })
})
