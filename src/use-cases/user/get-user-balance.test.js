import { UserNotFoundError } from '../../errors/user.js'
import { userBalance, user } from '../../tests/index.js'
import { GetUserBalanceUseCase } from './get-user-balance.js'
import { faker } from '@faker-js/faker'

describe('GetUserBalanceUseCase', () => {
    class GetUserBalanceRepositoryStub {
        async execute() {
            return userBalance
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }
    const makeSut = () => {
        const getUserBalanceRepository = new GetUserBalanceRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRepository,
        )

        return { sut, getUserBalanceRepository, getUserByIdRepository }
    }
    it('should get user balance successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(faker.string.uuid())

        //assert
        expect(result).toEqual(userBalance)
    })

    it('should throw UserNotFound if GetUserByIdRepository returns null', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockResolvedValue(null)
        const userId = faker.string.uuid()

        //act
        const promise = sut.execute(userId)

        //assert
        await expect(promise).rejects.toThrow(new UserNotFoundError(userId))
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        const userId = faker.string.uuid()
        const getUserByIdRepositorySpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )

        //act
        await sut.execute(userId)

        //assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId)
    })

    it('should call GetUserBalanceRepository with correct params', async () => {
        //arrange
        const { sut, getUserBalanceRepository } = makeSut()
        const userId = faker.string.uuid()
        const getUserBalanceRepositorySpy = import.meta.jest.spyOn(
            getUserBalanceRepository,
            'execute',
        )

        //act
        await sut.execute(userId)

        //assert
        expect(getUserBalanceRepositorySpy).toHaveBeenCalledWith(userId)
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockRejectedValue(new Error())
        const userId = faker.string.uuid()

        //act
        const promise = sut.execute(userId)

        //assert
        await expect(promise).rejects.toThrow()
    })

    it('should throw if GetUserBalanceRepository throws', async () => {
        //arrange
        const { sut, getUserBalanceRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserBalanceRepository, 'execute')
            .mockRejectedValue(new Error())
        const userId = faker.string.uuid()

        //act
        const promise = sut.execute(userId)

        //assert
        await expect(promise).rejects.toThrow()
    })
})
