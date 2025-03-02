import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
    constructor() {
        this.postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    }
    async execute(userId) {
        const deletedUser =
            await this.postgresDeleteUserRepository.execute(userId)

        return deletedUser
    }
}
