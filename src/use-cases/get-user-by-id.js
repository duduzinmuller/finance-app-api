import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js'

export class GetUserByIdUseCase {
    constructor() {
        this.postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()
    }
    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)

        return user
    }
}
