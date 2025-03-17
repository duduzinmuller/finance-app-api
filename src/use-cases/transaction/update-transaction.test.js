import { faker } from '@faker-js/faker'
import { transaction } from '../../tests/index.js'
import { UpdateTransactionUseCase } from './update-transaction.js'

describe('UpdateTransactionUseCase', () => {
    class UpdateTransactionRepositoryStub {
        async execute() {
            return transaction
        }
    }

    class GetTransactionByIdStub {
        async execute() {
            return transaction
        }
    }

    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()
        const getTransactionByIdRepository = new GetTransactionByIdStub()
        const sut = new UpdateTransactionUseCase(
            updateTransactionRepository,
            getTransactionByIdRepository,
        )

        return {
            sut,
            updateTransactionRepository,
            getTransactionByIdRepository,
        }
    }

    it('should update a transaction successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(transaction.id, {
            amount: Number(faker.finance.amount()),
        })

        //assert
        expect(result).toEqual(transaction)
    })

    it('should call UpdateTransactionRepository with correct params', async () => {
        //arrange
        const { sut, updateTransactionRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            updateTransactionRepository,
            'execute',
        )

        //act
        await sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        //assert
        expect(executeSpy).toHaveBeenCalledWith(transaction.id, {
            amount: transaction.amount,
        })
    })

    it('should call UpdateTransactionRepository with correct params', async () => {
        //arrange
        const { sut, updateTransactionRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            updateTransactionRepository,
            'execute',
        )

        //act
        await sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        //assert
        expect(executeSpy).toHaveBeenCalledWith(transaction.id, {
            amount: transaction.amount,
        })
    })

    it('should throw if UpdateTransactionRepository throws', async () => {
        //arrange
        const { sut, updateTransactionRepository } = makeSut()
        import.meta.jest
            .spyOn(updateTransactionRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        //act
        const promise = sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        //assert
        await expect(promise).rejects.toThrow()
    })
})
