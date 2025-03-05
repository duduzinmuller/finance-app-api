export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`O email ${email} ja esta em uso.`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`O usuario com id ${userId} não foi encontrado.`)
        this.name = 'UserNotFoundError'
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Forbidden')
        this.name = 'ForbiddenError'
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}

export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`Transaction with id ${transactionId} was not found.`)
        this.name = 'TransactionNotFoundError'
    }
}
