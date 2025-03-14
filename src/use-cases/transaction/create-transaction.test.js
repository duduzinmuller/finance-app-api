import { UserNotFoundError } from '../../errors/user.js'
import { transaction, user } from '../../tests/index.js'
import { CreateTransactionUseCase } from './create-transaction.js'

describe('CreateTransactionUseCase', () => {
    const createTransactionParams = {
        ...transaction,
        id: undefined,
    }

    class CreateTransactionRepositoryStub {
        async execute() {
            return transaction
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'random_id'
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        }
    }

    it('should create transaction successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(createTransactionParams)

        //assert
        expect(result).toEqual(transaction)
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )

        //act
        await sut.execute(createTransactionParams)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(createTransactionParams.user_id)
    })

    it('should call IdGeneratorAdapter', async () => {
        //arrange
        const { sut, idGeneratorAdapter } = makeSut()
        const executeSpy = import.meta.jest.spyOn(idGeneratorAdapter, 'execute')

        //act
        await sut.execute(createTransactionParams)

        //assert
        expect(executeSpy).toHaveBeenCalled()
    })

    it('should call CreateTransactionRepository with correct params', async () => {
        //arrange
        const { sut, createTransactionRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            createTransactionRepository,
            'execute',
        )

        //act
        await sut.execute(createTransactionParams)

        //assert
        expect(executeSpy).toHaveBeenCalledWith({
            ...createTransactionParams,
            id: 'random_id',
        })
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockResolvedValue(null)

        //act
        const promise = sut.execute(createTransactionParams)

        //assert
        await expect(promise).rejects.toThrow(
            new UserNotFoundError(createTransactionParams.user_id),
        )
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        //arrange
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        //act
        const promise = sut.execute(createTransactionParams)

        //assert
        await expect(promise).rejects.toThrow()
    })

    it('should throw if IdGeneratorAdapter throws', async () => {
        //arrange
        const { sut, idGeneratorAdapter } = makeSut()
        import.meta.jest
            .spyOn(idGeneratorAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error()
            })

        //act
        const promise = sut.execute(createTransactionParams)

        //assert
        await expect(promise).rejects.toThrow()
    })

    it('should throw if CreateTransactionRepository throws', async () => {
        //arrange
        const { sut, createTransactionRepository } = makeSut()
        import.meta.jest
            .spyOn(createTransactionRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        //act
        const promise = sut.execute(createTransactionParams)

        //assert
        await expect(promise).rejects.toThrow()
    })
})
