import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'
export class UpdateUserUseCase {
    constructor(passwordHasherAdapter) {
        this.getUserByEmailRepository = new PostgresGetUserByEmailRepository()
        this.updateUserRepository = new PostgresUpdateUserRepository()
        this.passwordHasherAdapter = passwordHasherAdapter
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = { ...updateUserParams }

        if (updateUserParams.password) {
            const hashedPassword = this.passwordHasherAdapter.execute(
                updateUserParams.password,
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
