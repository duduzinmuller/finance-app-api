import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    constructor() {
        this.postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()
        this.postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    }

    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProviderEmail =
                await this.postgresGetUserByEmailRepository.execute(
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

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
