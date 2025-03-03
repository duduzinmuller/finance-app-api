import { userNotFoundResponse } from '../../controllers/helpers/index.js'

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserRepository, getUserByIdRepository) {
        this.getTransactionsByUserRepository = getTransactionsByUserRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            return userNotFoundResponse()
        }

        const transactions = await this.getTransactionsByUserRepository.execute(
            params.userId,
        )

        return transactions
    }
}
