import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }
    async execute(createUserParams) {
        const userWithProviderEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

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

        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
