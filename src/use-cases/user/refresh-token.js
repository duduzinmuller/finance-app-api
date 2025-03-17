import { UnauthorizedError } from '../../errors/user.js'

export class RefreshTokenUseCase {
    constructor(tokensGeneratorAdapter, tokensVerifierAdapter) {
        this.tokensGeneratorAdapter = tokensGeneratorAdapter
        this.tokensVerifierAdapter = tokensVerifierAdapter
    }

    execute(refreshToken) {
        try {
            const decodedToken = this.tokensVerifierAdapter.execute(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET,
            )

            if (!decodedToken) {
                throw new UnauthorizedError()
            }

            return this.tokensGeneratorAdapter.execute(decodedToken.userId)
        } catch (error) {
            console.error(error)
            throw new UnauthorizedError()
        }
    }
}
