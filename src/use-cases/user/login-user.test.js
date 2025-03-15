import { LoginUserUseCase } from './login-user'
import { user } from '../../tests/index'
import { InvalidPasswordError, UserNotFoundError } from '../../errors'

describe('LoginUserUseCase', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return user
        }
    }

    class PasswordComparatorAdapterStub {
        async execute() {
            return true
        }
    }

    class TokensGeneratorAdapterStub {
        async execute() {
            return {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const passwordComparatorAdapter = new PasswordComparatorAdapterStub()
        const tokensGeneratorAdapter = new TokensGeneratorAdapterStub()
        const sut = new LoginUserUseCase(
            getUserByEmailRepository,
            passwordComparatorAdapter,
            tokensGeneratorAdapter,
        )

        return { sut, getUserByEmailRepository, passwordComparatorAdapter }
    }
    it('should throw UserNotFoundError if user is not found', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockResolvedValueOnce(null)

        const promise = sut.execute('any_email', 'any_password')

        await expect(promise).rejects.toThrow(new UserNotFoundError())
    })

    it('should throw InvalidPasswordError if password is invalid', async () => {
        const { sut, passwordComparatorAdapter } = makeSut()
        import.meta.jest
            .spyOn(passwordComparatorAdapter, 'execute')
            .mockReturnValueOnce(false)

        const promise = sut.execute('any_email', 'any_password')

        await expect(promise).rejects.toThrow(new InvalidPasswordError())
    })

    it('should return user with tokens', async () => {
        const { sut } = makeSut()

        const result = await sut.execute('any_email', 'any_password')

        expect(result.tokens.accessToken).toBeDefined()
    })
})
