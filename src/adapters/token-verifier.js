import jwt from 'jsonwebtoken'

export class TokensVerifierAdapter {
    execute(token, secret) {
        return jwt.verify(token, secret)
    }
}
