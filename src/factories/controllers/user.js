import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
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
import { PasswordHasherAdapter } from '../../adapters/index.js'

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

    const createUserController = new CreateUserUseCase(
        createUserUseCase,
        getUserByEmailRepository,
        passwordHasherAdapter,
    )

    const controller = new CreateUserController(createUserController)

    return controller
}

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByEmailRepository,
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
