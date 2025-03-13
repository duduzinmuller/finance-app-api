export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`Transação com id ${transactionId} não foi encontrada.`)
        this.name = 'TransactionNotFoundError'
    }
}
