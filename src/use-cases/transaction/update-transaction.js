import { userNotFoundResponse } from '../../controllers/helpers/index.js'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new userNotFoundResponse()
        }

        const transaction =
            await this.updateTransactionRepository.execute(params)

        return transaction
    }
}
