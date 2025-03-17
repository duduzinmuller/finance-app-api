import { UnauthorizedError } from '../../errors/user'
import { RefreshTokenUseCase } from './refresh-token'

describe('RefreshTokenUseCase', () => {
    class TokenVerifierAdapterStub {
        execute() {
            return true
        }
    }

    class TokensGeneratorAdapterStub {
        execute() {
            return {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }

    const makeSut = () => {
        const tokensGeneratorAdapter = new TokensGeneratorAdapterStub()
        const tokensVerifierAdapter = new TokenVerifierAdapterStub()
        const sut = new RefreshTokenUseCase(
            tokensGeneratorAdapter,
            tokensVerifierAdapter,
        )

        return { sut, tokensGeneratorAdapter, tokensVerifierAdapter }
    }

    it('should return new tokens', () => {
        const { sut } = makeSut()
        const refreshToken = 'any_refresh_token'

        const result = sut.execute(refreshToken)

        expect(result).toEqual({
            accessToken: 'any_access_token',
            refreshToken: 'any_refresh_token',
        })
    })

    it('should throw if tokenVerifierAdapter throws', () => {
        const { sut, tokensVerifierAdapter } = makeSut()
        import.meta.jest
            .spyOn(tokensVerifierAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error()
            })
        expect(() => sut.execute('any_refresh_token')).toThrow(
            new UnauthorizedError(),
        )
    })
})
