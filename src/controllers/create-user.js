import { CreateUserUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

export class CreateUserController {
    constructor() {
        this.createUserUseCase = new CreateUserUseCase()
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Parametro ausente: ${field}`,
                    })
                }
            }

            const passwordIsValid = params.password.length < 6

            if (passwordIsValid) {
                return badRequest({
                    message: 'A senha deve ter no minímo 6 caracteres.',
                })
            }

            const validIsEmail = validator.isEmail(params.email)

            if (!validIsEmail) {
                return badRequest({ message: 'Email invalído.' })
            }

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
