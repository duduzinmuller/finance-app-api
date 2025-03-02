import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserRepository = updateUserRepository
    }

    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProviderEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProviderEmail && userWithProviderEmail.id != userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = { ...updateUserParams }

        if (updateUserParams.password) {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                saltRounds,
            )

            user.password = hashedPassword
        }

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
