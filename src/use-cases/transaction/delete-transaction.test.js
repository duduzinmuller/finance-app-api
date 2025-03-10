import { transaction } from '../../tests/index.js'
import { DeleteTransactionUseCase } from './delete-transaction.js'

describe('DeleteTransactionUseCase', () => {
    class DeleteTransactionRepositoryStub {
        async execute() {
            return transaction
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub()
        const sut = new DeleteTransactionUseCase(deleteTransactionRepository)

        return { sut, deleteTransactionRepository }
    }

    it('should delete transaction successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(transaction.id)

        //assert
        expect(result).toEqual({ ...transaction, id: transaction.id })
    })

    it('should call DeleteTransactionRepository with correct params', async () => {
        //arrange
        const { sut, deleteTransactionRepository } = makeSut()
        const transactionId = transaction.id
        const executeSpy = jest.spyOn(deleteTransactionRepository, 'execute')

        //act
        await sut.execute(transactionId)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(transactionId)
    })

    it('should throw if DeleteTransactionRepository throws', async () => {
        //arrange
        const { sut, deleteTransactionRepository } = makeSut()
        const transactionId = transaction.id
        jest.spyOn(
            deleteTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        //act
        const promise = sut.execute(transactionId)

        //assert
        await expect(promise).rejects.toThrow()
    })
})
