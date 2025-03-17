import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    LoginUserController,
    RefreshTokenController,
    UpdateUserController,
} from '../../controllers/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'
import {
    IdGeneratorAdapter,
    PasswordHasherAdapter,
    PasswordComparatorAdapter,
    TokensGeneratorAdapter,
    TokensVerifierAdapter,
} from '../../adapters/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const controller = new GetUserByIdController(getUserByIdUseCase)

    return controller
}

export const makeCreateUserController = () => {
    const createUserUseCase = new PostgresCreateUserRepository()

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()
    const idGeneratorAdaptor = new IdGeneratorAdapter()
    const tokensGeneratorAdapter = new TokensGeneratorAdapter()

    const createUserController = new CreateUserUseCase(
        createUserUseCase,
        getUserByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdaptor,
        tokensGeneratorAdapter,
    )

    const controller = new CreateUserController(createUserController)

    return controller
}

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserRepository = new PostgresUpdateUserRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdapter,
    )

    const controller = new UpdateUserController(updateUserUseCase)

    return controller
}

export const makeDeleteUserController = () => {
    const deleteUserUseCase = new PostgresDeleteUserRepository()

    const deleteUserController = new DeleteUserUseCase(deleteUserUseCase)

    const controller = new DeleteUserController(deleteUserController)

    return controller
}

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    )

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )

    return getUserBalanceController
}

export const makeLoginUserController = () => {
    const passwordComparatorAdapter = new PasswordComparatorAdapter()
    const tokensGeneratorAdapter = new TokensGeneratorAdapter()
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const loginUserUseCase = new LoginUserUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokensGeneratorAdapter,
    )
    const loginUserController = new LoginUserController(loginUserUseCase)

    return loginUserController
}

export const makeRefreshTokenController = () => {
    const tokensGeneratorAdapter = new TokensGeneratorAdapter()
    const tokensVerifierAdapter = new TokensVerifierAdapter()
    const refreshTokenUseCase = new RefreshTokenUseCase(
        tokensGeneratorAdapter,
        tokensVerifierAdapter,
    )
    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase,
    )

    return refreshTokenController
}
