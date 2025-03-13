import { CreateUserController, UpdateUserController } from '../../controllers'
import { makeCreateUserController, makeUpdateUserController } from './user'

describe('User Factories Controller', () => {
    it('should return a valid CreateUserController instance', async () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController)
    })

    it('should return a valid UpdateUserController instance', () => {
        expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController)
    })
})
