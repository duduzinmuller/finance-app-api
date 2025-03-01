import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdUseCase {
    constructor() {
        this.postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()
    }
    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)

        return user
    }
}
