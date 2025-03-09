import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        createUserRepository,
        getUserByEmailRepository,
        passwordHasherAdapter,
    ) {
        this.createUserRepository = createUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
        this.passwordHasherAdapter = passwordHasherAdapter
    }
    async execute(createUserParams) {
        const userWithProviderEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        const userId = uuidv4()

        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
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
