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

export class InvalidPasswordError extends Error {
    constructor() {
        super(`Senha invalida`)
        this.name = 'InvalidPasswordError'
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Forbidden.')
        this.name = 'ForbiddenError'
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Forbidden.')
        this.name = 'UnauthorizedError'
    }
}
