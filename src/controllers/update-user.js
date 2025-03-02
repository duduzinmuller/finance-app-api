import validator from 'validator'
import { badRequest, ok, serverError } from './helpers/http.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    invalidPasswordResponse,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
} from './helpers/user.js'

export class UpdateUserController {
    constructor() {
        this.updateUserUseCase = new UpdateUserUseCase()
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: `Algum campo fornecido não é permitido.`,
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const validIsEmail = checkIfEmailIsValid(params.email)

                if (!validIsEmail) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
