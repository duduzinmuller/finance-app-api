export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`O email ${email} ja esta em uso.`)
        this.name = 'EmailAlreadyInUseError'
    }
}
