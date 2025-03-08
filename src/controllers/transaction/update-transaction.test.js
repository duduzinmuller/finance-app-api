import { UpdateTransactionController } from './update-transaction.js'
import { faker } from '@faker-js/faker'

describe('Update Transaction Controller', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            }
        }
    }
    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { sut, updateTransactionUseCase }
    }

    const baseHttpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    }

    it('should return 200 when updating a transaction successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute(baseHttpRequest)

        //assert
        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when transacation id is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            params: { transactionId: 'invalid_id' },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when unallowed field is provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                unallowedField: 'unallowed_field',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when amount is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                amount: 'amount_invalid',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when type is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                type: 'type_invalid',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when date is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                date: 'date_invalid',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 500 when UpdateTransactionUseCase throws', async () => {
        //arrange
        const { sut, updateTransactionUseCase } = makeSut()
        jest.spyOn(updateTransactionUseCase, 'execute').mockImplementationOnce(
            new Error(),
        )

        //act
        const response = await sut.execute(baseHttpRequest)

        //assert
        expect(response.statusCode).toBe(500)
    })

    it('should call CreateUserUseCase with correct params', async () => {
        //arrange
        const { sut, updateTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(updateTransactionUseCase, 'execute')

        //act
        await sut.execute(baseHttpRequest)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(
            baseHttpRequest.params.transactionId,
            baseHttpRequest.body,
        )
    })
})
