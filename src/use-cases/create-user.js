import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor() {
        this.postgresCreateUserRepository = new PostgresCreateUserRepository()
        this.postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()
    }
    async execute(createUserParams) {
        const userWithProviderEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        const userId = uuidv4()

        const saltRoads = 10
        const hashedPassword = await bcrypt.hash(
            createUserParams.password,
            saltRoads,
        )

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser =
            await this.postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
