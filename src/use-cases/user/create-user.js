import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        createUserRepository,
        getUserByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdaptor,
        tokensGeneratorAdapter,
    ) {
        this.createUserRepository = createUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdaptor = idGeneratorAdaptor
        this.tokensGeneratorAdapter = tokensGeneratorAdapter
    }
    async execute(createUserParams) {
        const userWithProviderEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        const userId = this.idGeneratorAdaptor.execute()

        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
        )

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser = await this.createUserRepository.execute(user)

        return {
            ...createdUser,
            tokens: this.tokensGeneratorAdapter.execute(userId),
        }
    }
}
