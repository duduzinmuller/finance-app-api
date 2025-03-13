import { CreateUserController } from '../../controllers'
import { makeCreateUserController } from './user'

describe('User Factories Controller', () => {
    it('should return a valid CreateUserController instance', async () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController)
    })
})
