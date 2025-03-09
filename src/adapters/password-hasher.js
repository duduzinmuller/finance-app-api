import bcrypt from 'bcrypt'

export class PasswordHasherAdapter {
    async exevute(password) {
        await bcrypt.hash(password, 10)
    }
}
