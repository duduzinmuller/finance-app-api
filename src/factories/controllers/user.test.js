import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './user'

describe('User Factories Controller', () => {
    it('should return a valid CreateUserController instance', async () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController)
    })

    it('should return a valid GetUserByIdController instance', () => {
        expect(makeGetUserByIdController()).toBeInstanceOf(
            GetUserByIdController,
        )
    })

    it('should return a valid UpdateUserController instance', () => {
        expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController)
    })

    it('should return a valid GetUserBalanceController instance', () => {
        expect(makeGetUserBalanceController()).toBeInstanceOf(
            GetUserBalanceController,
        )
    })

    it('should return a valid DeleteUserController instance', () => {
        expect(makeDeleteUserController()).toBeInstanceOf(DeleteUserController)
    })
})
