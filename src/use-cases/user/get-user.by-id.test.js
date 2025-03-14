import { user } from '../../tests/index.js'
import { GetUserByIdUseCase } from './get-user-by-id.js'
import { faker } from '@faker-js/faker'

describe('GetUserByIdUseCase', () => {
    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetUserByIdUseCase(getUserByIdRepository)

        return { sut, getUserByIdRepository }
    }

    it('should get user by id successfully', async () => {
        //arrange
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        //act
        const result = await sut.execute(userId)

        //assert
        expect(result).toEqual(user)
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
})
