import { faker } from '@faker-js/faker'
import { user } from '../../tests/index.js'
import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('GetTransactionByUserIdUseCase', () => {
    class GetTransactionsByUserIdRepositoryStub {
        async execute() {
            return []
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdRepository =
            new GetTransactionsByUserIdRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetTransactionsByUserIdUseCase(
            getTransactionsByUserIdRepository,
            getUserByIdRepository,
        )

        return { sut, getTransactionsByUserIdRepository, getUserByIdRepository }
    }

    it('should get transactions by user id successfully', async () => {
        //arrange
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        //act
        const result = await sut.execute(userId)

        //assert
        expect(result).toEqual([])
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockResolvedValue(null)
        const id = faker.string.uuid()

        //act & assert
        await expect(sut.execute(id)).rejects.toThrow(new UserNotFoundError(id))
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )
        const userId = faker.string.uuid()

        //act
        await sut.execute(userId)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(userId)
    })

    it('should call GetTransactionsByUserIdRepository with correct params', async () => {
        //arrange
        const { sut, getTransactionsByUserIdRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getTransactionsByUserIdRepository,
            'execute',
        )
        const userId = faker.string.uuid()

        //act
        await sut.execute(userId)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(userId)
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())
        const userId = faker.string.uuid()

        //act
        const promise = sut.execute(userId)

        //assert
        await expect(promise).rejects.toThrow()
    })

    it('should throw if GetTransactionsByUserIdRepository throws', async () => {
        //arrange
        const { sut, getTransactionsByUserIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getTransactionsByUserIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())
        const userId = faker.string.uuid()

        //act
        const promise = sut.execute(userId)

        //assert
        await expect(promise).rejects.toThrow()
    })
})
