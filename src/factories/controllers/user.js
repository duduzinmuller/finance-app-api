import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const controller = new GetUserByIdController(getUserByIdUseCase)

    return controller
}

export const makeCreateUserController = () => {
    const createUserUseCase = new PostgresCreateUserRepository()

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const createUserController = new CreateUserUseCase(
        createUserUseCase,
        getUserByEmailRepository,
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
