import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
    checkIfEmailIsValid,
} from './helpers/user.js'

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

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            const validIsEmail = checkIfEmailIsValid(params.email)

            if (!validIsEmail) {
                return emailIsAlreadyInUseResponse()
            }

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
