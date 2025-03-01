import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    constructor() {
        this.postgresCreateUserRepository = new PostgresCreateUserRepository()
    }
    async execute(createUserParams) {
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
