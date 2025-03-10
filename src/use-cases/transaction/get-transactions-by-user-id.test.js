import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('GetTransactionByUserIdUseCase', () => {
    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    }
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
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null)
        const id = faker.string.uuid()

        //act & assert
        await expect(sut.execute(id)).rejects.toThrow(new UserNotFoundError(id))
    })
})
