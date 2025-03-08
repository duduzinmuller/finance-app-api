import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserRepository, getUserByIdRepository) {
        this.getTransactionsByUserRepository = getTransactionsByUserRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const transactions = await this.getTransactionsByUserRepository.execute(
            params.userId,
        )

        return transactions
    }
}
